import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import firebase from "firebase/app";
import styles from "../styles/Login.module.css";
import { Button } from "react-bootstrap";
import SEO from "../components/SEO";

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
            .then(async (userCredential) => {
                var user = userCredential.user;

                let token = await user.getIdToken();
                window.location.href = `/api/completeSignIn?token=${token}`;
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
            .then(async (result) => {
                var user = result.user;

                let token = await user.getIdToken();
                window.location.href = `/api/completeSignIn?token=${token}`;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                alert(errorMessage);
            });
    };

    return (
        <div className={styles.container}>
            <SEO title="Login"></SEO>
            <main className={styles.main}>
                <div className={styles.topblock}>
                    <Link href="/">
                        <a href="#" className={styles.titlelink}>
                            <div className={styles.title}>Takeoff 🚀</div>
                        </a>
                    </Link>
                </div>
                <div className={styles.logindiv}>
                    <p className={styles.title}>Enter your credentials</p>
                    <input placeholder="Email" value={email} className={styles.logininput} onChange={(e) => setEmail(e.target.value)}></input>
                    <br />
                    <input placeholder="Password" value={password} type="password" className={styles.logininput} onChange={(e) => setPassword(e.target.value)}></input>
                    <br />
                    <Button className={styles.loginbutton} onClick={() => loginHandler()}>
                        Login
                    </Button>
                    <Button className={styles.loginbutton} onClick={() => googleLoginHandler()}>
                        Login with Google
                    </Button>
                    <Link href="/register">
                        <a href="#">Register</a>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default main;
