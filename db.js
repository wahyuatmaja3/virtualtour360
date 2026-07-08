const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS scenes (
            id TEXT PRIMARY KEY,
            title TEXT,
            panorama TEXT,
            pitch REAL DEFAULT 0,
            yaw REAL DEFAULT 0,
            hotspots TEXT DEFAULT '[]'
        )`, (err) => {
            if (!err) {
                // Seed initial data if empty
                db.get("SELECT COUNT(*) AS count FROM scenes", (err, row) => {
                    if (row.count === 0) {
                        const stmt = db.prepare("INSERT INTO scenes (id, title, panorama, pitch, yaw, hotspots) VALUES (?, ?, ?, ?, ?, ?)");
                        stmt.run('main_street', 'Main Street', 'uploads/street.jpg', 0, 0, JSON.stringify([
                            { pitch: 5, yaw: 45, type: 'scene', text: 'Go to Street F', sceneId: 'street_f' },
                            { pitch: 5, yaw: -45, type: 'scene', text: 'Go to Street L', sceneId: 'street_l' }
                        ]));
                        stmt.run('street_f', 'Street F', 'uploads/streetf.jpg', 0, 0, JSON.stringify([
                            { pitch: 0, yaw: -135, type: 'scene', text: 'Back to Main Street', sceneId: 'main_street' }
                        ]));
                        stmt.run('street_l', 'Street L', 'uploads/streetl.jpg', 0, 0, JSON.stringify([
                            { pitch: 0, yaw: 135, type: 'scene', text: 'Back to Main Street', sceneId: 'main_street' }
                        ]));
                        stmt.finalize();
                        console.log('Database seeded with initial scenes.');
                    }
                });
            }
        });
    }
});

module.exports = db;
