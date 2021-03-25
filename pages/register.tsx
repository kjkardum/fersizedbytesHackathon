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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerHandler = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
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
            <button onClick={() => registerHandler()}>Login</button>
        </div>
    );
}

export default main;
