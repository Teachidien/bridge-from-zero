import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Konfigurasi Resmi Firebase Spark Plan (100% Gratis Tanpa Kartu Kredit)
const firebaseConfig = {
  apiKey: "AIzaSyByOY2xzGe_4zuaUWKF8qy9RpB0MOQu9Q8",
  authDomain: "bridgefromzero-e2581.firebaseapp.com",
  projectId: "bridgefromzero-e2581",
  storageBucket: "bridgefromzero-e2581.firebasestorage.app",
  messagingSenderId: "93231837347",
  appId: "1:93231837347:web:8964ca8a3533e8b38f0f16",
  measurementId: "G-M77PYVMZLK"
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Services Spark Plan (Free Tier)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Analytics hanya diaktifkan di browser jika didukung
export let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;
