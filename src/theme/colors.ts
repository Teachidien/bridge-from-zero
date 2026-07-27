export const COLOR_PALETTE = {
  // Theme Latar Belakang Aplikasi
  app: {
    // Mode Edukasi & Modul (Light Ivory Clean)
    ivoryBg: '#F1F5F9',
    ivoryContainer: '#FFFFFF',
    ivorySubContainer: '#F8FAFC',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    
    // Mode Arena Meja Game (Emerald Casino Felt)
    tableBg: '#0B231B',
    tableContainer: '#071E17',
    tableCenter: '#061812',
  },

  // Palet Resmi 4 Warna Kartu Bridge (4-Color Muted Deck)
  card: {
    base: '#FFFFFF',
    spade: '#1E293B',    // Navy Slate
    heart: '#E11D48',    // Crimson Red
    diamond: '#D97706',  // Warm Amber
    club: '#059669',     // Emerald Green
    backBg: '#182232',   // Dark Card Back
  },

  // Aksens & Status
  accent: {
    amber: '#D97706',
    emerald: '#059669',
    crimson: '#E11D48',
    blue: '#2563EB',
  }
} as const;
