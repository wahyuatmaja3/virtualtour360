# 🌐 Virtual Tour 360°

Platform web aplikasi interaktif untuk menyajikan pengalaman jelajah virtual menggunakan gambar panorama 360 derajat (*equirectangular*). Terinspirasi dari platform seperti Google Maps Street View, project ini memungkinkan pengguna menjelajahi lokasi fisik secara digital melalui hotspot navigasi antar-ruangan yang dapat dikonfigurasi tanpa coding.

---

## ✨ Fitur Utama

### 👁️ Viewer (Pengunjung)
- **360° Panorama Viewer** — Rotasi penuh horizontal & vertikal menggunakan [Pannellum](https://pannellum.org/)
- **Drag & Swipe Navigation** — Kontrol mouse/trackpad di desktop, sentuhan di mobile
- **Zoom** — Scroll mouse atau pinch-to-zoom di layar sentuh
- **Hotspot Navigasi** — Titik interaktif untuk berpindah antar scene/ruangan
- **Transisi Scene** — Efek *fade* halus antar-scene (1 detik)
- **Fullscreen Mode** — Tampilan penuh layar
- **Auto Load** — Scene pertama langsung dimuat otomatis
- **Glassmorphism UI** — Header transparan dengan efek blur modern

### 🛠️ Admin Panel (CMS)
- **Upload Panorama** — Unggah gambar 360° (JPEG/PNG) langsung via browser
- **Manajemen Scene** — Tambah scene baru dengan ID unik dan judul
- **Kelola Hotspot** — Simpan & perbarui koordinat hotspot (pitch & yaw) per scene
- **Daftar Scene** — Tampilkan semua scene yang tersimpan dalam tabel

---

## 🗂️ Struktur Project

```
virtualtour360/
├── public/
│   ├── index.html          # Halaman viewer utama 360°
│   ├── script.js           # Logic viewer (fetch config & init Pannellum)
│   ├── style.css           # Styling utama (glassmorphism, loader, dll.)
│   ├── uploads/            # Direktori penyimpanan gambar panorama
│   └── admin/
│       ├── index.html      # Dashboard admin / CMS
│       └── admin.js        # Logic admin (upload scene, kelola hotspot)
├── server.js               # Express.js server & REST API
├── db.js                   # Koneksi & inisialisasi database SQLite
├── database.sqlite         # File database SQLite
├── package.json
└── architecture.md         # PRD & dokumen arsitektur lengkap
```

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | HTML5 Vanilla + CSS (Glassmorphism) |
| 360° Engine | [Pannellum](https://pannellum.org/) v2.5.6 |
| Backend | Node.js + [Express.js](https://expressjs.com/) v5 |
| Upload File | [Multer](https://github.com/expressjs/multer) v2 |
| Database | [SQLite3](https://www.npmjs.com/package/sqlite3) v6 |
| Font | Google Fonts — Outfit |

---

## 🚀 Cara Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org/) v18+ terinstall

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/wahyuatmaja3/virtualtour360.git
   cd virtualtour360
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```

3. **Jalankan server**
   ```bash
   node server.js
   ```

4. **Buka di browser**
   - **Viewer:** [http://localhost:3000](http://localhost:3000)
   - **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

> Saat pertama kali dijalankan, database akan otomatis dibuat dan di-seed dengan 3 scene awal: **Main Street**, **Street F**, dan **Street L**.

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/config` | Ambil semua konfigurasi scene untuk Pannellum |
| `GET` | `/api/scenes` | Ambil daftar semua scene (raw JSON) |
| `POST` | `/api/scenes` | Tambah scene baru + upload gambar panorama |
| `POST` | `/api/scenes/:id/hotspots` | Perbarui hotspot pada scene tertentu |

---

## 🗄️ Skema Database

Tabel `scenes` (SQLite):

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | TEXT (PK) | ID unik scene, tanpa spasi (contoh: `main_street`) |
| `title` | TEXT | Nama tampilan scene |
| `panorama` | TEXT | Path relatif gambar (contoh: `uploads/foto.jpg`) |
| `pitch` | REAL | Sudut vertikal awal kamera (default: `0`) |
| `yaw` | REAL | Sudut horizontal awal kamera (default: `0`) |
| `hotspots` | TEXT | Array hotspot tersimpan dalam format JSON |

---

## 🗺️ Roadmap Pengembangan

- [x] **Fase 1 — MVP:** Core viewer 360° dengan Pannellum + hotspot navigasi dasar
- [x] **Fase 2 — Interaktivitas:** Efek transisi scene, kontrol keyboard & mouse zoom
- [x] **Fase 3 — Backend & CMS:** REST API (Express.js), database SQLite, admin dashboard upload & manajemen scene
- [ ] **Fase 4 (Planned):** Mini-map / denah interaktif dengan radar arah pandang
- [ ] **Fase 4 (Planned):** Info spot multimedia (teks, galeri foto, embed video YouTube)
- [ ] **Fase 4 (Planned):** Background music / narasi audio per scene
- [ ] **Fase 5 (Planned):** Giroskop untuk mobile & Mode VR (split-screen)
- [ ] **Fase 5 (Planned):** Editor hotspot drag-and-drop di admin panel

---

## 📸 Format Gambar Panorama

Gunakan gambar **equirectangular** dengan rasio aspek **2:1** (contoh: 4096×2048 px) dalam format JPEG atau PNG untuk hasil terbaik.

---

## 📄 Lisensi

ISC License — lihat [package.json](./package.json) untuk detail.
