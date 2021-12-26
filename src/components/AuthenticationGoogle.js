import React from "react";
import { signInWithGoogle } from "../firebase-config";

const AuthenticationGoogle = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img src={localStorage.getItem("profilePic")} alt="nothing" />
    </div>
  );
};

export default AuthenticationGoogle;
