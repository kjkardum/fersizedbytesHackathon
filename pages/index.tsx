import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavBar from "../components/NavBar";
import HomeContent from "../components/HomeContent";
import AutoComplete from "../components/AutoComplete";

import React, { useState } from "react";
import { quotes } from "../services/quotes";
import Footer from "../components/Footer";

export default function Home() {
    const [search, setSearch] = useState("");

    return (
        <div className={styles.container}>
            <Head>
                <title>Takeoff</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar></NavBar>
            <main className={styles.main}>
                <div className={styles.topblock}>
                    <div className={styles.title}>Takeoff 🚀</div>
                    <div className={styles.quote}>
                        <p>{quotes[Math.floor(Math.random() * quotes.length)]}</p>
                    </div>
                </div>
                <div className={styles.contentblock}>
                    <div className={styles.searchcontainer}>
                        <input onChange={(e) => setSearch(e.target.value)} type="search" id="flightSearch" name="q" aria-label="Search flights" className={styles.searchbox} placeholder="Find a flight"></input>
                    </div>
                    <div>
                        <AutoComplete searchValue={search}></AutoComplete>
                    </div>
                    <HomeContent></HomeContent>
                    <Footer></Footer>
                </div>
            </main>
        </div>
    );
}
