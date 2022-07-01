// import {Firebase} from 'firebase';
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBD9Os01Y_nqrd1SPuCOPDS0bUCxTOmfyY",
    authDomain: "superheroes-9d5d2.firebaseapp.com",
    projectId: "superheroes-9d5d2",
    storageBucket: "superheroes-9d5d2.appspot.com",
    messagingSenderId: "765314687348",
    appId: "1:765314687348:web:d63dbd0db0c42f00454c21",
    measurementId: "G-14D2KSLDHY"
};
export const app = initializeApp(firebaseConfig);
// Firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);