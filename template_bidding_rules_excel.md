# TABEL TEMPLATE DATABASE ATURAN BIDDING BOT SAYC (EXCEL / CSV FORMAT)

| ID ATURAN | PRIORITAS | BIDDING RESULT | MIN HCP | MAX HCP | TARGET SUIT | MIN KARTU | BENTUK POLA | DESKRIPSI LENGKAP |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `OPEN_2C_STRONG` | 1 | `2♣` | 22 | 40 | `ANY` | 0 | `ANY` | Strong 2C Open Bid (Poin 22+) |
| `OPEN_2NT_BALANCED` | 2 | `2NT` | 20 | 21 | `ANY` | 0 | `BALANCED` | 2NT Open Bid (Poin 20-21 & Balanced) |
| `OPEN_1NT_BALANCED` | 3 | `1NT` | 15 | 17 | `ANY` | 0 | `BALANCED_5332` | 1NT Open Bid (Poin 15-17 & Balanced termasuk 5332) |
| `OPEN_PREEMPT_3S` | 4 | `3♠` | 4 | 9 | `spades` | 7 | `ANY` | Preemptive 3S Open Bid (Poin 4-9 & 7 kartu Spades) |
| `OPEN_PREEMPT_3H` | 5 | `3♥` | 4 | 9 | `hearts` | 7 | `ANY` | Preemptive 3H Open Bid (Poin 4-9 & 7 kartu Hearts) |
| `OPEN_PREEMPT_3D` | 6 | `3♦` | 4 | 9 | `diamonds` | 7 | `ANY` | Preemptive 3D Open Bid (Poin 4-9 & 7 kartu Diamonds) |
| `OPEN_PREEMPT_3C` | 7 | `3♣` | 4 | 9 | `clubs` | 7 | `ANY` | Preemptive 3C Open Bid (Poin 4-9 & 7 kartu Clubs) |
| `OPEN_WEAK_2S` | 8 | `2♠` | 7 | 11 | `spades` | 6 | `ANY` | Weak-Two 2S Open Bid (Poin 7-11 & 6 kartu Spades) |
| `OPEN_WEAK_2H` | 9 | `2♥` | 7 | 11 | `hearts` | 6 | `ANY` | Weak-Two 2H Open Bid (Poin 7-11 & 6 kartu Hearts) |
| `OPEN_WEAK_2D` | 10 | `2♦` | 7 | 11 | `diamonds` | 6 | `ANY` | Weak-Two 2D Open Bid (Poin 7-11 & 6 kartu Diamonds) |
| `OPEN_MAJOR_1S` | 11 | `1♠` | 12 | 21 | `spades` | 5 | `ANY` | Major 1S Open Bid (Poin 12-21 & 5+ Spades) |
| `OPEN_MAJOR_1H` | 12 | `1♥` | 12 | 21 | `hearts` | 5 | `ANY` | Major 1H Open Bid (Poin 12-21 & 5+ Hearts) |
| `OPEN_MINOR_1D` | 13 | `1♦` | 12 | 21 | `diamonds` | 4 | `ANY` | Minor 1D Open Bid (Poin 12-21 & 4+ Diamonds) |
| `OPEN_MINOR_1C` | 14 | `1♣` | 12 | 21 | `clubs` | 3 | `ANY` | Better Minor 1C Open Bid (Poin 12-21) |
