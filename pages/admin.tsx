import Head from "next/head";
import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import styles from "../styles/Admin.module.css";

function main({ Component, pageProps }) {
    const [pp1Name, setPp1Name] = useState("");
    const [pp1Description, setPp1Description] = useState("");
    const [pp1Url, setPp1Url] = useState("");

    const [pp2Name, setPp2Name] = useState("");
    const [pp2Description, setPp2Description] = useState("");
    const [pp2Url, setPp2Url] = useState("");

    fetch("/api/featured")
        .then((data) => {
            // setPp1(data.pp1);
            // setPp2(data.pp2);
        })
        .catch((err) => console.log(err));

    return (
        <div className={styles.container}>
            <Head>
                <title>Takeoff</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar setCity={(city) => {}}></NavBar>
            <main className={styles.main}>
                <div className={styles.topblock}>
                    <h2>Admin page</h2>
                </div>
                <div className={styles.contentblock}>
                    <Row>
                        <Col>
                            <Card style={{ width: "90%", height: "100%", margin: "auto" }}>
                                <h4>Set Featured post 1 on homepage</h4>
                                <p>Name:</p>
                                <input className={styles.basicinput} defaultValue={pp1Name} onKeyPress={(e) => setPp1Name(e.target.value)}></input>
                                <br />
                                <p>Url:</p>
                                <input className={styles.basicinput} defaultValue={pp1Url} onKeyPress={(e) => setPp1Url(e.target.value)}></input>
                                <br />
                                <p>Description:</p>
                                <textarea style={{ height: "300px", resize: "none" }} defaultValue={pp1Description} onKeyPress={(e) => setPp1Description(e.target.value)}></textarea>
                                <br />
                                <Button
                                    onClick={() => {
                                        fetch("localhost:3000/featured?i=0", {
                                            method: "POST",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({ name: pp1Name, desciption: pp1Description, image: pp1Url }),
                                        });
                                    }}
                                >
                                    Update
                                </Button>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: "90%", height: "100%", margin: "auto" }}>
                                <h4>Set Featured post 2 on homepage</h4>
                                <p>Name:</p>
                                <input className={styles.basicinput} defaultValue={pp2Name} onKeyPress={(e) => setPp2Name(e.target.value)}></input>
                                <br />
                                <p>Url:</p>
                                <input className={styles.basicinput} defaultValue={pp2Url} onKeyPress={(e) => setPp2Url(e.target.value)}></input>
                                <br />
                                <p>Description:</p>
                                <textarea style={{ height: "300px", resize: "none" }} defaultValue={pp2Description} onKeyPress={(e) => setPp2Description(e.target.value)}></textarea>
                                <br />
                                <Button
                                    onClick={() => {
                                        fetch("localhost:3000/featured?i=1", {
                                            method: "POST",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({ name: pp2Name, desciption: pp2Description, image: pp2Url }),
                                        });
                                    }}
                                >
                                    Update
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default main;
