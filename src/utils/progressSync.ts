import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface UserProgressData {
  completedModules: number[];
  completedPuzzles: number[];
  biddingScore: number;
  totalGamesPlayed: number;
  lastUpdated: string;
}

const LOCAL_STORAGE_KEY = "bridge_user_progress";

export const getLocalProgress = (): UserProgressData => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed reading local progress:", err);
  }
  return {
    completedModules: [1],
    completedPuzzles: [],
    biddingScore: 0,
    totalGamesPlayed: 0,
    lastUpdated: new Date().toISOString(),
  };
};

export const saveLocalProgress = (data: Partial<UserProgressData>) => {
  try {
    const current = getLocalProgress();
    const updated = { ...current, ...data, lastUpdated: new Date().toISOString() };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn("Failed saving local progress:", err);
    return getLocalProgress();
  }
};

export const syncProgressToFirestore = async (userId: string, data: Partial<UserProgressData>) => {
  const localData = saveLocalProgress(data);
  try {
    const userDocRef = doc(db, "user_progress", userId);
    await setDoc(userDocRef, localData, { merge: true });
    return true;
  } catch (err) {
    console.warn("Firestore sync failed (using offline storage):", err);
    return false;
  }
};

export const fetchProgressFromFirestore = async (userId: string): Promise<UserProgressData> => {
  try {
    const userDocRef = doc(db, "user_progress", userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data() as UserProgressData;
      saveLocalProgress(data);
      return data;
    }
  } catch (err) {
    console.warn("Failed loading Firestore progress, using local:", err);
  }
  return getLocalProgress();
};
