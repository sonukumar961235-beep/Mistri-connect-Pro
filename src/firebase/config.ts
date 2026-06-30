import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  projectId: "lithe-nirvana-5rwfn",
  appId: "1:290477641665:web:ae28198f407263f7d2e940",
  apiKey: "AIzaSyBVWsJLatyPh7lxneWF6uz6XowkJVkbpbo",
  authDomain: "lithe-nirvana-5rwfn.firebaseapp.com",
  storageBucket: "lithe-nirvana-5rwfn.firebasestorage.app",
  messagingSenderId: "290477641665",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-mistriconnect-b2bacf10-f5d2-4f20-a8f7-f27f9e1b9f24");
export const storage = getStorage(app);

let messaging = null;
isSupported().then((supported) => {
  if (supported) {
    messaging = getMessaging(app);
  }
});
export { messaging };
