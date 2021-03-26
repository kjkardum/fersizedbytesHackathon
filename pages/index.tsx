import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavBar from "../components/NavBar";
import HomeContent from "../components/HomeContent";
import AutoComplete from "../components/AutoComplete";
import AnimatedBackground from "../components/AnimatedBackground";

import React, { useState } from "react";
import { quotes } from "../services/quotes";
import Footer from "../components/Footer";
import CityContent from "../components/CityContent";
import { NextPageContext } from "next";

export default function Home(props: { user: boolean }) {
    const [search, setSearch] = useState("");
    const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

    let inputTimer;
    const [city, setCity] = useState("");
    const [fullCity, setFullCity] = useState("");

    return (
        <div className={styles.container}>
            <Head>
                <title>Takeoff</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar user={props.user} setCity={(city) => setCity(city)}></NavBar>
            <main className={styles.main}>
                <AnimatedBackground></AnimatedBackground>
                <div className={styles.topblock}>
                    <div className={styles.title}>Takeoff 🚀</div>
                    <div className={styles.quote}>
                        <p>{quote}</p>
                    </div>
                </div>
                <div className={styles.contentblock}>
                    <div className={styles.searchcontainer}>
                        <input
                            onChange={(e) => {
                                clearTimeout(inputTimer);
                                inputTimer = setTimeout(function () {
                                    setSearch(e.target.value);
                                }, 50);
                            }}
                            type="search"
                            id="flightSearch"
                            name="q"
                            aria-label="Search flights"
                            className={styles.searchbox}
                            placeholder="Find a flight"
                            autoComplete="off"
                        ></input>
                        <AutoComplete
                            setCity={(city) => {
                                setCity(city);
                            }}
                            searchValue={search}
                        ></AutoComplete>
                    </div>
                    {city ? <CityContent city={city}></CityContent> : <HomeContent></HomeContent>}
                    <Footer></Footer>
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx: NextPageContext) {
    return { props: { user: ctx.req.headers?.cookie?.split("X-T=")?.[1] ? true : false } };
}
