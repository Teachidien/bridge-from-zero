# Rekomendasi Fitur Masa Depan & Pengembangan Tingkat Lanjut (Future Roadmap)

## 📌 Deskripsi Dokumen
Dokumen ini berisi daftar ide fitur lanjutan, arsitektur masa depan, serta rencana skalabilitas untuk game **Bridge From Zero**. Fitur-fitur di bawah ini disisihkan dari fase rilis awal (MVP) agar pengembangan awal tetap fokus, ringan, dan **100% GRATIS (Firebase Spark Plan Tanpa Kartu Kredit)**.

---

## 🚀 Fitur Masa Depan (Future Features & Scale)

### 1. Global Leaderboard & Fitur Sosial (Firebase Firestore)
- **Konsep:** Papan peringkat global berdasarkan Akurasi Bidding (%) dan Total Win Rate.
- **Tujuan:** Meningkatkan *user engagement* & persaingan sehat antar pemain.
- **Implementasi:** Menggunakan query agregasi Firestore gratis.

### 2. Arsitektur Monetisasi & Fitur Pro (Monetization & Gatekeeping)
- **Konsep:** Membuka fitur lanjutan untuk pengguna berbayar / Pro Member.
- **Fitur Pro:**
  - *Custom Bidding Configurator* (Mengatur logika bidding bot sendiri).
  - *Unlimited AI Coach Calls* (Panggilan API Pelatih tanpa batas).
  - Ekspor/Impor format file PBN secara massal.

### 3. Mode Multiplayer Real-time (Bermain Bersama Pemain Asli)
- **Konsep:** Menambahkan opsi pembuatan *Room* untuk 4 pemain asli di internet.
- **Persyaratan:** Membutuhkan Firebase Realtime Database / WebSockets dan penanganan kondisi pemain terputus (reconnection guard).

### 4. Integrasi Sentry Error Tracking (Advanced Crash Reporting)
- **Konsep:** Pelaporan crash otomatis tingkat tinggi untuk menangkap bug unik di HP pengguna spesifik.

---

## 🛠️ Catatan Pengembang (Developer Notes)
Semua fitur di atas telah dirancang agar **dapat ditambahkan tanpa merusak kodingan awal** (*Decoupled Architecture*).
