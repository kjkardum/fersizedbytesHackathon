import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";
import styles2 from "../styles/MyReservations.module.css";
import { Button } from "react-bootstrap";
import { Database, IReservation, ITicketOrder } from "../services/Database";
import NavBar from "../components/NavBar";
import AnimatedBackground from "../components/AnimatedBackground";
import { FlightMap } from "../components/FlightMap";
import { NextPageContext } from "next";
import SEO from "../components/SEO";
import safeStringify from "../util/safeStringify";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { FaTicketAlt, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function myReservation(props: { user: boolean; userReservations?: string; userBookings?: string }) {
    const [flightResoults, setFlightResoults] = useState([]);

    let userReservations: Array<IReservation> = JSON.parse(props.userReservations);
    let userBookings: Array<ITicketOrder> = JSON.parse(props.userBookings);

    return (
        <div className={styles.container}>
            <SEO title="My Reservations"></SEO>
            <NavBar user={props.user} hideMobileSearch={true} setCity={() => {}}></NavBar>
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

                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                        {userReservations &&
                            userReservations.map((ur, i) => (
                                <div key={i} className={styles2.entry}>
                                    <h3>Reservation</h3>
                                    <h4>FlightID: {ur.flight}</h4>
                                    <h5>Departure: {ur.date}</h5>
                                    {new Date(ur.reservedAt).toLocaleString()}

                                    <div
                                        className={styles2.cancelButton}
                                        onClick={async () => {
                                            console.log(ur);
                                            await fetch("/api/reservation", {
                                                method: "DELETE",
                                                body: JSON.stringify(ur),
                                            });

                                            await Swal.fire("Sucess!", "Your reservation have been sucessfuly canceled", "success");

                                            window.location.href = "/myReservations";
                                        }}
                                    >
                                        Cancel Reservation
                                        <FaTimes color="red" />
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                        {userBookings &&
                            userBookings.map((ur, i) => (
                                <div key={i} className={styles2.entry}>
                                    <h3>Order</h3>
                                    <h4>FlightID: {ur.flight}</h4>
                                    <div key={i}>
                                        {ur.tickets.map((t, ti) => (
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                                <FaTicketAlt size={32} style={{ margin: "1em" }} />
                                                <div key={`ti_${ti}`} style={{ textAlign: "start" }}>
                                                    <h4>
                                                        {t.name} {t.surname}
                                                    </h4>
                                                    {t.birth}
                                                </div>
                                            </div>
                                        ))}

                                        {new Date(ur.bookedAt).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx: NextPageContext) {
    let cookie = ctx.req.headers?.cookie?.split("X-T=")?.[1];
    if (!cookie) return { props: { user: false } };

    let db = new Database();
    await db.init();

    let user = await db.ValiadateAuthToken(cookie);

    if (user) return { props: { user: true, userReservations: safeStringify(await db.GetUserReservations(user.uid)), userBookings: safeStringify(await db.GetUserTickets(user.uid)) } };

    return { props: { user: false } };
}
