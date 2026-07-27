# Master Implementation Plan: Bridge From Zero

Dokumen ini berisi rencana pengerjaan proyek **Bridge From Zero** secara bertahap (step-by-step). Setiap kali satu langkah selesai dikerjakan, status pada dokumen ini akan diperbarui menjadi ✅ **SELESAI**.

---

## 🚦 Status Pengerjaan Ringkas

- **Total Step:** 8 Fase Utama
- **Status Saat Ini:** 🚀 **Fase 8 - Step 8.2: Konfigurasi CI/CD GitHub Actions**

---

## 📋 Daftar Rencana Kerja Detail

### Fase 1: Setup Proyek & Infrastruktur Dasar
- [x] **Step 1.1: Inisialisasi Project (Vite + React + TypeScript)** ✅ **SELESAI**
  - Membuat struktur folder proyek menggunakan `Vite` dan `TypeScript`.
- [x] **Step 1.2: Install & Konfigurasi Utility (Tailwind CSS, Zustand, Framer Motion, Lucide Icons)** ✅ **SELESAI**
  - Mengatur `tailwind.config.js` dengan palet warna custom (*Emerald Felt*, *Amber Gold*, *Crimson*, *Navy*).
- [x] **Step 1.3: Konfigurasi Firebase Spark Plan (Auth & Firestore)** ✅ **SELESAI**
  - Menyiapkan `src/lib/firebase.ts` tanpa Cloud Functions (100% Spark Plan Tanpa Kartu Kredit).
- [x] **Step 1.4: Konfigurasi PWA & i18n Multi-Bahasa (ID & US-English)** ✅ **SELESAI**
  - Menyiapkan manifest PWA (offline support) dan file penerjemah 2 bahasa (ID / US-EN).

---

### Fase 2: Sistem Kartu & Desain Visual Core
- [x] **Step 2.1: Pembuatan Komponen SVG Vector Card Engine** ✅ **SELESAI**
  - Komponen kartu 4 warna (*Spade Navy, Heart Crimson, Diamond Amber, Club Emerald*).
  - State kartu: *Normal, Selected, Playable/Glowing, Dimmed/Unplayable*.
- [x] **Step 2.2: Animasi Kartu (Framer Motion)** ✅ **SELESAI**
  - Animasi pembagian kartu (*dealing*), meluncur ke meja (*card drop*), dan efek melayang (*hover lift*).
- [x] **Step 2.3: Komponen Meja Game & Bidding Box** ✅ **SELESAI**
  - Layout 4 arah mata angin (North, South, East, West) yang responsif (PC & HP).
  - Panel Bidding Box clean menempel presisi di atas tumpukan kartu tangan.

---

### Fase 3: Kurikulum Tingkat 1 (Pemula Banget - Wajib Berurutan)
- [x] **Step 3.1: Modul 1 - Pengenalan Kartu & Simbol** ✅ **SELESAI**
  - Hirarki & warna 4 suit (*Spade, Heart, Diamond, Club*).
  - Menggunakan Template *Light Ivory Clean* (`#F1F5F9` / `#FFFFFF`).
  - Kuis interaktif pengenalan Major/Minor Suit.
- [x] **Step 3.2: Modul 2 - Fit & Pencocokan Kartu** ✅ **SELESAI**
  - Prinsip 8 Kartu Fit vs No-Trump (NT).
  - UI 2 set kartu ukuran normal berhadapan (North & South) + Bidding Box mini khusus lambang di tengah meja.
- [x] **Step 3.3: Modul 3 - Menghitung Poin Kartu (High Card Points - HCP)** ✅ **SELESAI**
  - Kalkulator & kuis penghitung poin (A=4, K=3, Q=2, J=1).
  - Tampilan ringkas *compact pill badges*.
- [ ] **Step 3.3: Vitest Automated Unit Testing**
  - Membuat test script untuk menguji 100+ aturan Bridge secara otomatis.

---

### Fase 4: Logika Aturan Game Engine & Automated Testing (Vitest)
- [x] **Step 4.1: Logika Pembagian Kartu & Evaluasi Tangan (Deal & Hand Evaluation)** ✅ **SELESAI**
  - Engine `src/utils/dealer.ts` (Fisher-Yates Shuffle, 13 kartu 4-arah, Auto-Sort ♠-♥-♦-♣, Evaluator HCP & Distribusi).
- [x] **Step 4.2: Logika Auction Engine (Bidding Rules & Contract Finalization)** ✅ **SELESAI**
  - Engine `src/utils/biddingEngine.ts` (Streamlined Bidding Box, Universal Dynamic Filtering 1-7 & Suits, Matriks PBN 4-Kolom NORTH-EAST-SOUTH-WEST dengan Dealer Offset Alignment, Resolusi Final Contract & Declarer).
- [x] **Step 4.3: Logika Trick-Taking Engine (Gameplay Play Card Rules)** ✅ **SELESAI**
  - Engine `src/utils/trickTakingEngine.ts` (Aturan Lead, Mandatory Follow-Suit Validation, Discard & Trump Ruffing Evaluation, Penentuan Pemenang Trick).
- [x] **Step 4.4: Logika Skoring Resmi Bridge (Official Bridge Scoring Engine)** ✅ **SELESAI**
  - Engine `src/utils/scoringEngine.ts` (Kalkulasi presisi Contract Score, Game Bonus +300/500 vs Part-Score +50, Overtricks, Slam Bonus, dan Undertrick Penalty).
- [x] **Step 4.5: Automated Unit Testing dengan Vitest** ✅ **SELESAI**
  - Script test `src/test/engine.test.ts` (8 Suite Test Case Lulus 100% Bebas Bug).

---

### Fase 5: Kecerdasan Bot Lawan & Fitur Pelatih AI
- [x] **Step 5.1: Logika Bot Lawan (SAYC Rules)** ✅ **SELESAI**
  - Engine `src/utils/botEngine.ts` (Aturan SAYC 100% Client-Side Tanpa Token API: 1NT 15-17 5332, Strong 2♣ 22+, Weak-Two 2♦/2♥/2♠ 7-11 6-kartu, 2NT 20-21, Partner Support, & Play Card AI).
- [x] **Step 5.2: Integrasi Pelatih AI (Gemini API Free Tier + Support BYOK)** ✅ **SELESAI**
  - Engine `src/utils/aiCoachEngine.ts` (Fitur "Tanya Pelatih", Google Gemini Free Tier API + Support BYOK di LocalStorage, & Offline Local Fallback Engine).
- [x] **Step 5.3: Client-Side Rate Limiter Guard** ✅ **SELESAI**
  - Guard `src/utils/rateLimiterGuard.ts` (Membatasi pemanggilan API maks 10x/menit untuk menjaga kuota gratis).

---

### Fase 6: Integrasi UI Game Table Utuh (4 Mode Permainan) & Firebase Deployment
- [x] **Step 6.1: Penyatuan Arena Game Table Base** ✅ **SELESAI**
  - Menggabungkan Dealer Engine, SAYC Bidding Engine, dan Play Card Trick Engine ke dalam satu arena meja game (`GameTable.tsx` / `demo_step61_gametable.html`).
  - Mengimplementasikan Fresh Brighter Casino Emerald Theme (`#064E3B`) yang terang, segar, dan ramah di mata tanpa garis neon silau.
  - Mengimplementasikan Tight Precision Overlap Kartu Tangan (menutupi lambang tengah kartu).
  - Mengimplementasikan Layout Simulasi 4 Dummy (North/South Horisontal Normal, West Dummy Matrix Kiri, East Dummy Matrix Rata Kanan Murni dengan Kartu Kecil di Kiri & As di Kanan).
- [x] **Step 6.2: Implementasi 4 Game Mode Utama** ✅ **SELESAI**
  - **Mode 1: Interactive Learning Mode:** Pelatihan langkah demi langkah berurutan (Tingkat 1) dengan bantuan AI Pelatih & tombol Undo.
  - **Mode 2: Bidding Practice Mode:** Latihan penawaran khusus vs Bot SAYC dengan evaluasi akurasi bidding.
  - **Mode 3: Full Game vs Bot Practice Mode:** Simulasi permainan 13 trick penuh (Bidding + Play Card + Dummy Control + Scoring).
  - **Mode 4: Bridge Puzzles & Challenges:** Tantangan soal Bridge interaktif dengan target trick/kontrak tertentu.

---

### Fase 7: Login Google Sign-In & Portofolio Tracking
- [x] **Step 7.1: Firebase Authentication (Google Sign-In 1-Klik & Mode Tamu)** ✅ **SELESAI**
  - Modul auth `src/utils/authService.ts` & widget di `Navbar.tsx` (Google 1-Klik popup & mode tamu anonymous).
- [x] **Step 7.2: Sinkronisasi Progres Firestore & PWA Offline Caching** ✅ **SELESAI**
  - Helper `src/utils/progressSync.ts` & integrasi `useGameStore.ts` (Sinkronisasi otomatis progres modul & puzzle ke Cloud Firestore dengan fallback LocalStorage & Workbox PWA Service Worker offline caching).

---

### Fase 8: Testing Akhir, CI/CD Pipeline & Deployment Firebase
- [x] **Step 8.1: Build Optimasi Produksi & Verifikasi Offline PWA** ✅ **SELESAI**
  - `npm run build`: 100% lulus, PWA Service Worker `dist/sw.js` tergenerasi. Vitest 12/12 tests passed.
- [ ] **Step 8.2: Konfigurasi Otomatisasi CI/CD (GitHub Actions -> Firebase Hosting)**
- [ ] **Step 8.3: Deploy ke Firebase Hosting (Live Release)**
