import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";
import styles2 from "../styles/MyReservations.module.css";
import { Button } from "react-bootstrap";
import { Database } from "../services/Database";
import NavBar from "../components/NavBar";
import AnimatedBackground from "../components/AnimatedBackground";
import { FlightMap } from "../components/FlightMap";

function main({ Component, pageProps }) {
    const [flightResoults, setFlightResoults] = useState([]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Takeoff</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar hideMobileSearch={true}></NavBar>
            <main className={styles.main}>
                <AnimatedBackground></AnimatedBackground>
                <div className={styles.topblock}>
                    <Link href="/">
                        <a href="#" className={styles.titlelink}>
                            <div className={styles.title}>Takeoff 🚀</div>
                        </a>
                    </Link>
                </div>
                <div className={styles.logindiv}></div>
            </main>

            <div className={styles.contentblock}>
                <div className={styles2.minheightblock}>
                    <div className={styles2.reservationstitle}>My Reservations</div>

                    {flightResoults["flights"]?.map((fr, i) => {
                        return (
                            <div key={i} className={`${styles.ticket} bigshadow`}>
                                <strong>
                                    {fr.itineraries[0].segments[0].departure.iataCode}{" "}
                                    {fr.itineraries[0].segments.map((i) => (
                                        <>
                                            {">"} {i.arrival.iataCode}
                                        </>
                                    ))}
                                </strong>
                                <div>Departure at {fr.itineraries[0].segments[0].departure.at.replace("T", " ")}</div>
                                <div>Duration: {fr.itineraries[0].duration}</div>
                                <div className={styles.ticketright}>
                                    Price: {fr.price.total} {fr.price.currency}
                                </div>
                                <br />
                                <FlightMap
                                    height="360px"
                                    center={{
                                        lat: 45,
                                        lng: 15,
                                    }}
                                    zoom={6}
                                ></FlightMap>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    //Database.GetUserReservations();

    // Pass data to the page via props
    return { props: { test: "test" } };
}

export default main;
