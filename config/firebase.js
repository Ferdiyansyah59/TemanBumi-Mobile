// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAXS6ZSLVrIKsEaZI6WyID6pdciy0kIiRI',
  authDomain: 'sampah-affbd.firebaseapp.com',
  projectId: 'sampah-affbd',
  storageBucket: 'sampah-affbd.appspot.com',
  messagingSenderId: '900004600035',
  appId: '1:900004600035:web:d7da772b26ce8f1a78cdd6',
  measurementId: 'G-DYDH3BVVVP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
