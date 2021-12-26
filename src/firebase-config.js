import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuzeVutACgs3_ymckDO4Vue1zFzd7Zo6w",
  authDomain: "authentication-tutorial-10dc1.firebaseapp.com",
  projectId: "authentication-tutorial-10dc1",
  storageBucket: "authentication-tutorial-10dc1.appspot.com",
  messagingSenderId: "160251825885",
  appId: "1:160251825885:web:5d08536563d91408d75534",
  measurementId: "G-SBKP9LKJSY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
