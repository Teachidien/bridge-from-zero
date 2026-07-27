# Spesifikasi Design Prompt UI/UX: Bridge From Zero

## 1. Ringkasan & Tujuan Proyek
- **Nama Proyek:** Bridge From Zero
- **Deskripsi:** Game web interaktif edutainment untuk mengajarkan pemula cara bermain kartu Bridge dari 0 hingga mahir.
- **Platform Hosting & Database:** Firebase Spark Plan (**100% GRATIS TANPA KARTU KREDIT**).
  - *Hosting:* Firebase Hosting (Gratis).
  - *Database:* Cloud Firestore / Realtime Database (Gratis tier tanpa kartu).
  - *Auth:* Firebase Authentication (Email / Google Sign-In Gratis).
  - *Catatan:* Menghindari Firebase Cloud Functions / Storage eksternal yang meminta verifikasi kartu kredit (Pay-as-you-go). Semua logika game dijalankan Client-Side / Client Workers.
- **Konsep Utama:** Pengalaman belajar berbasis gamifikasi yang menggabungkan modul tutorial step-by-step, latihan lawan Bot AI, dan teka-teki (puzzle) Bridge.

---

## 2. Rincian & Keputusan Tech Stack (Step-by-Step)

| Step | Kategori Tech Stack | Opsi Pilihan | Keputusan / Status |
| :--- | :--- | :--- | :--- |
| **1** | **Bahasa Pemrograman** | A) TypeScript (Lebih aman & profesional)<br>B) JavaScript (Lebih fleksibel) | ✅ **TypeScript (Dipilih)** |
| **2** | **Game Core & Animasi** | A) React + Tailwind + Framer Motion (UI Halus & Edutainment)<br>B) Phaser.js (Engine Game 2D) | ✅ **React + Tailwind + Framer Motion (Dipilih)** |
| **3** | **State Management Game** | A) Zustand (Ringan, Hemat Token & Cepat)<br>B) Redux Toolkit (Kompleks & Banyak Kode) | ✅ **Zustand (Dipilih)** |
| **4** | **Fitur Pelatih AI** | A) Hibrida (Bot Kode + Gemini API Free Tier & Support Bring Your Own Key)<br>B) Algoritma Kode Murni 100% | ✅ **Hibrida (Dipilih)** |
| **5** | **Backend & Hosting** | Firebase Spark Plan (Hosting, Auth, Firestore - **100% Gratis Tanpa Kartu Kredit**) | ✅ **Firebase Spark Plan (Dipilih)** |

---

## 3. Rincian & Keputusan Fitur & Arsitektur Lanjutan (Step-by-Step Tahap 2)

| Step | Kategori Pembahasan | Deskripsi & Opsi | Keputusan / Status |
| :--- | :--- | :--- | :--- |
| **5** | **Fitur "Mengapa Langkah Ini?"** | A) Penjelasan Narasi Lengkap dari Pelatih<br>B) Hanya Sorot Kartu | ✅ **Opsi A: Narasi Lengkap (Dipilih)** |
| **6** | **Mode Pemulihan Kesalahan (Undo & Replay)** | A) Boleh Undo di Mode Belajar, Kunci di Mode Puzzle<br>B) Tanpa Undo sama sekali | ✅ **Opsi A: Undo di Mode Belajar (Dipilih)** |
| **7** | **Sistem Login & Portofolio Tracking** | A) Google Sign-In (Gmail 1-Klik) + Mode Tamu & Firestore Tracking<br>B) Wajib Form Email Biasa | ✅ **Google Sign-In (Gmail) + Guest (Dipilih)** |
| **8** | **Sistem Bidding Bot & Monetisasi** | 3 Sistem Bidding (SAYC, Precision, & Custom Builder untuk Monetisasi/Player) | ✅ **3 Sistem: SAYC + Precision + Custom (Dipilih)** |
| **9** | **Sistem Evaluasi Paska Game (Post-Game)** | A) Papan Skor Official Bridge + Evaluasi Analisis Pelatih<br>B) Hanya Menang/Kalah | ✅ **Opsi A: Skor Official + Analisis (Dipilih)** |
| **10** | **Aksesibilitas & Palet Warna Kartu** | Dek 4 Warna Elegan (Spade=Navy, Heart=Merah Crimson, Diamond=Oranye Amber, Club=Hijau Emerald - Muted & Premium) | ✅ **Dek 4 Warna Elegan/Amber (Dipilih)** |

---

## 4. Rincian & Keputusan Infrastruktur & Performa (Step-by-Step Tahap 3)

| Step | Kategori Pembahasan | Deskripsi & Opsi | Keputusan / Status |
| :--- | :--- | :--- | :--- |
| **11** | **Penyimpanan Lokal / Offline Mode** | A) Progressive Web App (PWA) + LocalStorage (Bisa dimainkan tanpa internet)<br>B) Harus Online | ✅ **Opsi A: PWA + Offline Support (Dipilih)** |
| **12** | **Strategi Asset Bundle & Performance** | A) SVG Vector Cards Murni (Ukuran <500KB & Tajam 4K)<br>B) Gambar PNG Biasa | ✅ **Opsi A: SVG Vector Cards (Dipilih)** |
| **13** | **Skema Pengujian Kode (Testing)** | A) Vitest Automated Unit Testing (Otomatis verifikasi 100+ aturan Bridge)<br>B) Manual Testing | ✅ **Opsi A: Vitest Testing (Dipilih)** |
| **14** | **Fitur Ekspor & Bagikan Tangan (Deal Sharing)** | A) Ekspor PBN + Share Link Tangan Kartu (Bisa kirim susunan kartu ke teman)<br>B) Tanpa Fitur Bagikan | ✅ **Opsi A: PBN Export & Share Link (Dipilih)** |
| **15** | **Keamanan & Rate-Limiting API** | A) Client-Side Throttling Guard (Proteksi kuota Gemini API tanpa butuh Cloud Functions/Kartu)<br>B) Tanpa Guard | ✅ **Opsi A: Client Guard 100% Gratis (Dipilih)** |

---

## 5. Rincian & Keputusan Masa Depan & Skalabilitas Pro (Step-by-Step Tahap 4)

| Step | Kategori Pembahasan | Deskripsi & Opsi | Keputusan / Status |
| :--- | :--- | :--- | :--- |
| **16** | **Infrastruktur Multiplayer Real-time** | A) Fokus Singleplayer 100% Gratis + Arsitektur Rapi (Tanpa Biaya Server Tambahan)<br>B) Hardcoded Bot | ✅ **Fokus Singleplayer 100% Gratis (Dipilih)** |
| **17** | **In-App Analytics & Error Tracking** | A) Firebase Analytics (Gratis Spark Plan) + Local Error Boundary<br>B) Tanpa Analytics | ✅ **Firebase Analytics Gratis (Dipilih)** |
| **18** | **Internasionalisasi (i18n Multi-Bahasa)** | A) react-i18next (Toggle 2 Bahasa: 🇮🇩 Indonesia & 🇬🇧 Inggris)<br>B) Hanya Bahasa Indonesia | ✅ **Opsi A: 2 Bahasa ID/EN (Dipilih)** |
| **19** | **Rencana Masa Depan & Monetisasi** | Fitur Leaderboard, Monetisasi Pro, & Multiplayer dipindahkan ke file roadmap khusus | ✅ **Dipindah ke `rekomendasi_masa_depan.md`** |

- **Tata Letak Kartu di Tangan Pemain (Hand Overlap Layout):**
  - Tumpukan 13 kartu tersusun dempet presisi dari kiri ke kanan.
  - Kartu paling kiri (misal Ace) berada di paling bawah (`z-index` terendah) dan hanya memperlihatkan pojok kiri atasnya (~25%, huruf/angka + simbol suit). Simbol besar di tengah kartu tertutup 100% oleh kartu sebelahnya.
  - Kartu paling kanan (misal 5 Club) berada di paling atas (`z-index` tertinggi) dan nampak utuh 100%.
  - Efek hover/touch: Kartu terangkat lurus ke atas tanpa efek glowing/neon.

---

## 2. Sistem Desain Visual & Estetika (Kelas Profesional)
- **Konsep Tema:** *Premium Modern Casino* (Mewah, elegan, bersih, profesional, menggunakan tipografi *Plus Jakarta Sans*).
- **Sistem Warna Tema Aplikasi:**
  - **Layar Edukasi & Modul Pembelajaran:** Template *Light Ivory Clean* (`#F1F5F9` / `#FFFFFF`) yang segar, bersih, terang, dan sangat nyaman untuk sesi belajar membaca teks panjang.
  - **Layar Arena Meja Permainan Kartu:** Karpet *Emerald Casino Felt* (`#0B231B` / `#071E17`) untuk pengalaman meja kartu profesional dan autentik.
- **Card Deck Palette (4 Warna Kartu Resmi):**
  - Base Kartu: Pure White (`#FFFFFF`).
  - ♠️ Spade: Slate Navy (`#1E293B`)
  - ♥️ Heart: Crimson Red (`#E11D48`)
  - ♦️ Diamond: Warm Amber (`#D97706`)
  - ♣️ Club: Emerald Green (`#059669`)
  - **Tombol Utama (Play):** Deep Emerald Solid (`#059669`)
  - **Tombol Utility (Bidding Box):** White Card-Pill (`#FFFFFF` dengan teks slate gelap `#1E293B`)

---

## 3. Tata Letak Halaman (Layout Breakdown)

### Halaman A: Landing Page / Menu Utama
1. **Header Navigation:**
   - Logo "Bridge From Zero" dengan ikon 4 simbol kartu.
   - Tombol Pengaturan Suara & Tema.
2. **Hero Section:**
   - Judul Utama: "Kuasai Game Bridge, Langkah demi Langkah."
   - Tombol Utama (CTA): "Mulai Belajar (Modul 1)"
   - Tombol Sekunder: "Latihan Bebas vs Bot"
3. **Peta Pembelajaran Berdasarkan Tingkat Keahlian:**

   * 🟢 **Tingkat 1: Pemula Banget (Wajib Wajib/Wajib Berurutan)**
     - **Modul 1:** Pengenalan Kartu & Simbol (Spade ♠, Heart ♥, Diamond ♦, Club ♣).
     - **Modul 2:** Pencocokan Kartu & Fit (Prinsip 8 Kartu Fit vs No-Trump / NT).
     - **Modul 3:** Menghitung Poin Kartu (HCP: A=4, K=3, Q=2, J=1).

   * 🟡 **Tingkat 2: Pemula (Bebas Dipilih / Opsional)**
     - **Modul Play (Teknik Main Declarer):**
       * Simple Play (Aturan Dasar Trick-Taking).
       * Belajar Finesse.
       * Belajar Drop.
       * Belajar Cross-Ruff.
     - **Modul Defense (Teknik Main Defender):**
       * Belajar Lead (Kartu Pertama).
       * Belajar Membalas Lead Partner.
     - **Modul Bidding (Penawaran Dasar):**
       * Bahasa Penawaran & Kontrak Dasar.

   * 🔴 **Tingkat 3: Bisa (Ujian Akhir & Latihan Bebas)**
     - **Modul Simulator Utama:** Permainan Utuh 4 Pemain (Full Game vs Bot) & Evaluasi Pelatih AI.

---

### Halaman B: Layar Tutorial Interaktif (Mode Belajar)
1. **Layout Split-Screen:**
   - **Panel Kiri (35% lebar layar):** Panduan & Asisten Pelatih
     - Penjelasan aturan singkat, tips pelatih, modal "Mengapa langkah ini dipilih?", tombol Lanjut.
   - **Panel Kanan (65% lebar layar):** Meja Simulasi Mini
     - Meja interaktif tempat pemain mencoba langsung aturan yang sedang dipelajari.

---

### Halaman C: Meja Permainan Utama (Game Table UI)
1. **Layout Meja 4 Arah Mata Angin:**
   - **North (Partner / Dummy):** Kartu terbuka/tertutup tergantung fase.
   - **South (Pemain):** Kartu di tangan menghadap ke atas, terurut rapi berdasarkan simbol (Spades, Hearts, Diamonds, Clubs).
   - **East & West (Lawan / Bot AI):** Avatar bot + jumlah sisa kartu.
2. **Area Tengah (The Trick Area):**
   - Kartu yang sedang dimainkan di putaran aktif (maksimal 4 kartu).
   - Indikator Jumlah Trick & Trump (Truf) aktif.
3. **Bidding Box (Panel Penawaran):**
   - Grid pilihan angka (1-7), Simbol (♣, ♦, ♥, ♠, NT), Pass, Double, Redouble.
4. **Tombol Bantuan & Pelatih (Action Bar):**
   - **Tombol "Tanya Pelatih (Hint)":** Menampilkan saran langkah terbaik beserta alasannya.
   - Tombol Undo (khusus mode latihan).

---

## 4. Daftar Komponen UI

1. **Komponen Kartu (Card Component):**
   - Rasio standar kartu (1:1.4).
   - Indikator kartu yang boleh dimainkan (glowing/highlight) dan kartu yang dikunci (dimmed).
2. **Komponen Bidding Box:**
   - Modal popup grid yang rapi dan responsif.
   - Gelembung percakapan dengan avatar pelatih yang ramah.

---

## 5. Mode Permainan Utama (4 Main Game Modes)

1. **Mode Kursus & Tutorial (Interactive Learning Mode):**
   - Berisi 3 Tingkat Keahlian (Pemula Banget ➔ Pemula ➔ Bisa).
2. **Mode Latihan Khusus Bidding (Dedicated Bidding Practice Mode):**
   - Simulator khusus lelang/penawaran: Pemain dan 3 Bot saling membalas bidding secara cepat berdasarkan kartu di tangan masing-masing untuk mengasah intuisi penawaran.
3. **Mode Latihan Bebas vs Bot (Quick Play / Full Game Practice):**
   - Permainan utuh 4 pemain dari sesi Bidding sampai Play of Cards tanpa instruksi kaku.
4. **Mode Teka-Teki / Puzzle Bridge (Bridge Puzzles & Challenges):**
   - Tantangan strategi cepat (misal: "Selesaikan 3 trick terakhir untuk menang").

---

## 6. Instruksi untuk AI Pembuat UI (Prompt AI)
> "Tolong buatkan kode UI/UX responsif yang bersih dan elegan (menggunakan React + Tailwind CSS atau CSS Modern) untuk aplikasi game **Bridge From Zero** berdasarkan spesifikasi di atas. Berikan tampilan dark-mode berkesan mewah (premium), hirarki visual yang jelas, komponen kartu yang smooth, serta layout meja game Bridge yang sangat intuitif untuk pemula."
