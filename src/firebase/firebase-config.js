import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVcXnU6t8Bfo1_p5UinniJCNnSJFxJGCI",
  authDomain: "blogproject-bc4c1.firebaseapp.com",
  projectId: "blogproject-bc4c1",
  storageBucket: "blogproject-bc4c1.appspot.com",
  messagingSenderId: "78298352863",
  appId: "1:78298352863:web:2b8aa1721ec282ef342d6a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

//Author
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
