const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('./db');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// API Endpoints
// Get all scenes configuration for Pannellum
app.get('/api/config', (req, res) => {
    db.all("SELECT * FROM scenes", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const scenes = {};
        let firstScene = null;

        rows.forEach((row, index) => {
            if (index === 0) firstScene = row.id;
            scenes[row.id] = {
                title: row.title,
                type: "equirectangular",
                panorama: row.panorama,
                pitch: row.pitch,
                yaw: row.yaw,
                hfov: 100,
                minHfov: 50,
                maxHfov: 120,
                hotSpots: JSON.parse(row.hotspots)
            };
        });

        res.json({
            default: {
                firstScene: firstScene || "default",
                sceneFadeDuration: 1000,
                autoLoad: true,
                showFullscreenCtrl: true,
                showControls: true,
                mouseZoom: true,
                keyboardZoom: true,
                compass: false,
            },
            scenes: scenes
        });
    });
});

app.get('/api/scenes', (req, res) => {
    db.all("SELECT * FROM scenes", [], (err, rows) => {
         if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows.map(row => ({...row, hotspots: JSON.parse(row.hotspots)})));
    });
});

app.post('/api/scenes', upload.single('panorama'), (req, res) => {
    const { id, title } = req.body;
    let panoramaPath = '';
    
    if (req.file) {
        panoramaPath = 'uploads/' + req.file.filename;
    }

    db.run(
        "INSERT INTO scenes (id, title, panorama, pitch, yaw, hotspots) VALUES (?, ?, ?, ?, ?, ?)",
        [id, title, panoramaPath, 0, 0, '[]'],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Scene added successfully', id: id });
        }
    );
});

// Update Hotspots
app.post('/api/scenes/:id/hotspots', (req, res) => {
    const sceneId = req.params.id;
    const { hotspots } = req.body;
    
    db.run(
        "UPDATE scenes SET hotspots = ? WHERE id = ?",
        [JSON.stringify(hotspots), sceneId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Hotspots updated successfully' });
        }
    );
});

app.listen(port, () => {
    console.log(`Virtual Tour app listening at http://localhost:${port}`);
});
