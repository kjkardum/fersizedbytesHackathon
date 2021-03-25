import React, { useState } from "react";
import styles from "../styles/CityContent.module.css";
import { Line } from "react-chartjs-2";

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../services/config";

import { Row, Col, Form, Button } from "react-bootstrap";
import { array } from "joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CityContent = (props) => {
    const [flightTo, setFlightTo] = useState(props.city);
    const [flightFrom, setFlightFrom] = useState("");
    const [flightDeparture, setFlightDeparture] = useState("");
    const [flightArrival, setFlightArrival] = useState("");
    const [flightQuantity, setFlightQuantity] = useState(1);
    const [checkoutFlow, setCheckoutFlow] = useState("basicInfo");
    const [lastCity, setLastCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [hotelData, setHotelData] = useState([]);
    const [reservationData, setReservationData] = useState({ list: [] });

    if (props.city && props.city != lastCity) {
        fetch("/api/getDestinationInfo?q=" + props.city)
            .then((data) => data.json())
            .then((data) => {
                setHotelData(data);
                console.log(data);
                setLoading(false);
            });
        setLastCity(props.city);
        setCheckoutFlow("basicInfo");
        setLoading(true);
    }
    return (
        <div className={styles.citycontent}>
            <Form
                className={styles.cityform}
                onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutFlow(e.nativeEvent.submitter.name);
                    const arr = [];
                    for (let i = 0; i < flightQuantity; i++) arr.push({});
                    setReservationData({ list: [...arr] });
                }}
                action="/"
                method="GET"
            >
                <Form.Control type="hidden" name="to" value={props.city}></Form.Control>
                <Form.Row>
                    <Col sm={6}>
                        Location
                        <Form.Control onInput={(e) => checkoutFlow == "basicInfo" && setFlightFrom(e.target.value)} id="from" size="lg" name="from" placeholder="From" />
                    </Col>
                    <Col sm={2}>
                        Departure
                        <Form.Control onInput={(e) => checkoutFlow == "basicInfo" && setFlightDeparture(e.target.value)} id="departure" size="lg" name="departure" type="datetime-local" placeholder="Departure" />
                    </Col>
                    <Col sm={2}>
                        Arrival
                        <Form.Control onInput={(e) => checkoutFlow == "basicInfo" && setFlightArrival(e.target.value)} id="arrival" size="lg" name="arrival" type="datetime-local" placeholder="Arrival" />
                    </Col>
                    <Col sm={2}>
                        Number of Tickets
                        <Form.Control onInput={(e) => checkoutFlow == "basicInfo" && setFlightQuantity(e.target.value)} min="1" max="15" size="lg" name="quantity" type="number" placeholder="Number of tickets" />
                    </Col>
                </Form.Row>
                <Button variant="primary" type="submit" name="reservation" className={styles.submitbutton}>
                    Make a reservation
                </Button>
                <Button variant="primary" type="submit" name="checkout" className={styles.submitbutton}>
                    Buy flight
                </Button>
            </Form>
            <hr />
            {checkoutFlow == "basicInfo" && (
                <>
                    {loading ? (
                        <div className="loader">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    ) : (
                        <>
                            <div className={styles.hotelstitle}>Hotels Nearby</div>
                            <Row>
                                {hotelData.map((e, i) => (
                                    <Col md={4} key={e.hotel.name}>
                                        {e.hotel.media && <img className={`${styles.hotelimage} bigshadow`} src={i == 1 ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" : i == 2 ? "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1225&q=80" : e.hotel.media[0].uri}></img>}

                                        <div className={styles.hoteltitle}>{e.hotel.name}</div>
                                        <div className={styles.hoteldescription}>{e.offers[0].room.description.text}</div>
                                    </Col>
                                ))}
                            </Row>
                            <Line data={{ labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050] }}></Line>;
                        </>
                    )}
                </>
            )}
            {checkoutFlow == "reservation" && (
                <Row>
                    {reservationData.list.map((i, item) => {
                        <Col>
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                        </Col>;
                    })}
                </Row>
            )}
        </div>
    );
};
export default CityContent;
