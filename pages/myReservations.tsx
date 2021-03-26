import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

import styles from "../styles/Login.module.css";
import { Button } from "react-bootstrap";
import { Database } from "../services/Database";

function main({ Component, pageProps }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Takeoff</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.topblock}>
                    <Link href="/">
                        <a href="#" className={styles.titlelink}>
                            <div className={styles.title}>Takeoff 🚀</div>
                        </a>
                    </Link>
                </div>
                <div className={styles.logindiv}></div>
            </main>
        </div>
    );
}

export async function getServerSideProps() {
    //Database.GetUserReservations();

    // Pass data to the page via props
    return { props: { test: "test" } };
}

export default main;
