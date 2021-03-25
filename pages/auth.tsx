import React, { useState } from "react";
import firebase from "firebase/app";

import "firebase/auth";

import { firebaseConfig } from "../services/config";

function main({ Component, pageProps }) {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    const googleLoginProvider = new firebase.auth.GoogleAuthProvider();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message);
            });
    };

    const googleLoginHandler = () => {
        firebase
            .auth()
            .signInWithPopup(googleLoginProvider)
            .then((result) => {
                var credential = result.credential;
                var user = result.user;

                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                alert(errorMessage);
            });
    };

    return (
        <div>
            <p>Enter your credentials</p>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br />
            <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br />
            <button onClick={() => loginHandler()}>Login</button>
            <button onClick={() => googleLoginHandler()}>
                Login with Google
            </button>
        </div>
    );
}

export default main;
