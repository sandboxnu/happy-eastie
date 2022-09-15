// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, setDoc } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmdJmtmltlGNL9_OiwefAn2VmhLbtpwAg",
    authDomain: "happy-eastie.firebaseapp.com",
    projectId: "happy-eastie",
    storageBucket: "happy-eastie.appspot.com",
    messagingSenderId: "786219075341",
    appId: "1:786219075341:web:788a1c7da63cf9d33e9244",
    measurementId: "G-ZP1KEZ1253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const analytics = getAnalytics(app);


// Example
// Updates or adds a cool bean to Firestore with the given name.
export async function setCoolBean(name: string) {
    await setDoc(doc(db, "beans"), { name })
}