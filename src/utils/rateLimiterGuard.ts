export interface RateLimiterState {
  callCount: number;
  lastCallTimestamp: number;
}

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // Window 1 menit
const MAX_CALLS_PER_MINUTE = 10; // Maksimal 10 panggilan per menit untuk menjaga Kuota Free Tier

let rateState: RateLimiterState = {
  callCount: 0,
  lastCallTimestamp: 0,
};

/**
 * Memeriksa apakah pemanggilan AI Coach diizinkan oleh Client-Side Rate Limiter Guard
 */
export function checkRateLimit(): { allowed: boolean; waitSeconds: number } {
  const now = Date.now();

  // Reset window jika sudah lewat dari 1 menit
  if (now - rateState.lastCallTimestamp > RATE_LIMIT_WINDOW_MS) {
    rateState = {
      callCount: 0,
      lastCallTimestamp: now,
    };
  }

  if (rateState.callCount >= MAX_CALLS_PER_MINUTE) {
    const waitMs = RATE_LIMIT_WINDOW_MS - (now - rateState.lastCallTimestamp);
    return {
      allowed: false,
      waitSeconds: Math.ceil(waitMs / 1000),
    };
  }

  return { allowed: true, waitSeconds: 0 };
}

/**
 * Mencatat pemanggilan API setelah berhasil
 */
export function recordApiCall(): void {
  rateState.callCount++;
}
