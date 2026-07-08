# Product Requirements Document (PRD)
## Platform Website Virtual Tour 360° Interactive

**Dokumen Status:** Final Draft  
**Tanggal:** 5 Juli 2026  
**Target Platform:** Web Browser (Desktop, Tablet, Mobile)  

---

### 1. Ringkasan Eksekutif (Executive Summary)
Produk ini adalah platform aplikasi berbasis web (*web application*) interaktif yang dirancang untuk menyajikan pengalaman jelajah virtual (*virtual tour*) menggunakan aset gambar panorama 360 derajat (*equirectangular*). Terinspirasi dari platform seperti *Museum Nasional Virtual Tour* dan *Google Maps Street View*, website ini bertujuan untuk memberikan simulasi imersif suatu lokasi fisik kepada pengguna secara digital melalui integrasi titik navigasi, elemen informasi kaya media (teks, gambar, audio, video), dan performa pemuatan yang optimal.

### 2. Tujuan & Sasaran Utama (Objectives & Goals)
* **Aksesibilitas Global:** Menyediakan akses tanpa batas bagi audiens umum untuk mengeksplorasi lokasi secara detail dari mana saja dan kapan saja.
* **Retensi Pengguna Tinggi:** Memberikan antarmuka yang intuitif dan interaktif guna meningkatkan durasi kunjungan pengguna (*average session duration*) di atas 3 menit.
* **Performa Responsif:** Memastikan aset gambar resolusi tinggi (360°) dapat dimuat secara cepat (< 3 detik pada koneksi standar) di perangkat desktop maupun *mobile*.

### 3. Target Pengguna (User Persona)
1.  **Pengunjung Umum (End-User):** Audiens yang mengakses website untuk menjelajahi lokasi secara virtual. Membutuhkan navigasi yang mudah dipahami, kontrol yang lancar, dan informasi yang jelas.
2.  **Administrator / Konten Kreator (Admin):** Pengelola platform yang bertanggung jawab mengunggah gambar panorama, menentukan koordinat titik navigasi (*hotspot*), serta memperbarui konten informasi (*info spot*).

---

### 4. Spesifikasi Fungsional (Functional Requirements)

#### A. Fitur Sisi Pengunjung (Front-End Viewer)
1.  **Mesin Penampil 360° (360° Core Viewer):**
    * Mendukung rotasi penuh 360 derajat secara horizontal (yaw) dan vertikal (pitch).
    * Kontrol navigasi menggunakan *drag* (mouse/trackpad) atau *swipe* (layar sentuh).
    * Fitur perbesaran gambar (*Zoom In / Zoom Out*) menggunakan scroll mouse atau cubitan jari (*pinch to zoom*).
2.  **Sistem Navigasi Hotspot (Scene Transition):**
    * Penempatan ikon panah atau indikator visual di dalam ruang 360° untuk berpindah ke ruangan/titik foto berikutnya.
    * Transisi antar-ruangan yang halus (*fade-in / fade-out* atau efek pergerakan kamera).
3.  **Titik Informasi Interaktif (Info Spots):**
    * Ikon interaktif (misal: simbol 'i' atau pin) yang dapat diklik untuk membuka jendela *pop-up* / *modal*.
    * Konten info spot mendukung: Teks deskripsi, Galeri foto detail (2D), Sematan (*embed*) Video YouTube/Vimeo, dan pemutar audio narasi.
4.  **Peta Mini / Denah Interaktif (Floor Plan / Mini-Map):**
    * Denah 2D lokasi yang diletakkan di sudut layar (dapat disembunyikan/dimunculkan).
    * Indikator posisi pengguna saat ini dalam bentuk titik radar yang berputar sesuai dengan arah pandang kamera di dalam ruang 360°.
    * Pengguna dapat berpindah lokasi secara instan dengan mengklik titik ruangan pada denah tersebut.
5.  **Menu Navigasi Thumbnail:**
    * Daftar galeri gambar kecil (*thumbnail*) di bagian bawah layar untuk pintasan navigasi cepat antar-area utama.
6.  **Fitur Kontrol Tambahan:**
    * **Mode Fullscreen:** Tombol untuk memperluas tampilan hingga memenuhi layar penuh.
    * **Giroskop (Gyroscope Control):** Menggunakan sensor akselerometer perangkat mobile untuk menggerakkan kamera virtual sesuai gerakan fisik ponsel.
    * **Mode VR Dasar:** Pemisahan layar (*split-screen*) untuk mendukung kacamata VR pasif (seperti Google Cardboard).

#### B. Fitur Sisi Administrator (Content Management System / CMS)
*Catatan: Direkomendasikan untuk Fase Pengembangan Lanjutan (Fase 2/3).*
1.  **Manajemen Panorama:** Menu untuk mengunggah gambar 360° dengan validasi format (JPEG/PNG) dan rekomendasi rasio 2:1 (*equirectangular*).
2.  **Editor Hotspot Visual:** Antarmuka *drag-and-drop* di atas gambar 360° untuk menempatkan titik navigasi dan titik informasi berdasarkan koordinat Pitch & Yaw secara presisi.
3.  **Manajemen Denah:** Fitur mengunggah peta lokasi dan memetakan koordinat titik foto 360° di atas peta tersebut.

---

### 5. Persyaratan Non-Fungsional (Non-Functional Requirements)

* **Kecepatan & Performa:** Implementasi teknik *Image Tiling* atau *Multi-resolution* (memecah gambar besar menjadi potongan-potongan kecil dengan beberapa tingkat resolusi) agar gambar tidak berat saat pertama kali dimuat.
* **Kompatibilitas Lintas Browser:** Berjalan lancar di Google Chrome, Mozilla Firefox, Apple Safari, dan Microsoft Edge versi terbaru yang mendukung WebGL.
* **Desain Responsif:** UI kontrol (tombol, denah, menu) harus menyesuaikan ukuran secara otomatis baik pada orientasi lanskap (Desktop) maupun potret (Smartphone).
* **Keamanan:** Pengamanan akses direktori aset gambar dan proteksi API jika menggunakan sistem database.

---

### 6. Rekomendasi Arsitektur & Teknologi (Tech Stack)

* **Pilihan 1: Tanpa Koding dari Nol (Software Berbayar / No-Code)**
    * Menggunakan perangkat lunak seperti **3DVista Virtual Tour** atau **Krpano**. Hasil ekspor berupa file HTML/JS statis yang bisa langsung di-host di server (cepat rilis, fitur sangat kaya).
* **Pilihan 2: Pengembangan Mandiri Berbasis Kode (Open Source) - *DITERAPKAN***
    * **Front-End:** HTML5 Vanilla + CSS (Mendukung Glassmorphism).
    * **Backend:** Node.js (Express.js) untuk API server, menangani upload file, dan manajemen *scenes*.
    * **Database:** SQLite untuk menyimpan konfigurasi panorama (metadata, pengaturan *scenes*) dan hotspot secara persisten.
    * **Library 360° engine:** **Pannellum** (ringan dan mudah diintegrasikan).
    * **Penyimpanan:** Aset gambar disimpan di lokal server (`/public/uploads`).

---

### 7. Alur Pengembangan & Rencana Fase (Roadmap)

* **Fase 1: Minimum Viable Product (MVP)**
    * Implementasi core viewer 360° menggunakan library pilihan (Pannellum).
    * Penambahan info spot dasar berupa teks dan gambar 2D.
    * Optimasi kompresi gambar agar website ringan.
* **Fase 2: Interaktivitas Lanjutan**
    * Integrasi fitur Mini-Map / Denah dengan radar arah pandang.
    * Penambahan elemen audio latar (*background music*) atau audio narasi pada tiap titik ruangan.
    * Implementasi menu thumbnail di bagian bawah halaman.
* **Fase 3: Otomatisasi & CMS (Sedang Berjalan)**
    * Pengembangan sistem backend (Node.js) dan database (SQLite) untuk menyimpan konfigurasi dan koordinat hotspot.
    * Pembuatan dashboard admin agar proses input gambar 360° dan pengaturan antar-ruangan (scene) tidak perlu melalui koding manual lagi.
