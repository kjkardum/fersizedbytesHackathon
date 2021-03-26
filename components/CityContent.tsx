import React, { useState } from "react";
import styles from "../styles/CityContent.module.css";
import { Line } from "react-chartjs-2";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../services/config";

import AutoComplete from "../components/AutoComplete";
import ReactPayPalButton from "../components/ReactPayPalButton";
import { Row, Col, Form, Button, FormControl, Card } from "react-bootstrap";
import { array } from "joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CityContent = (props) => {
    const [temps, setTemps] = useState({ temps: new Array(24) });
    const [search, setSearch] = useState("");
    const [flightTo, setFlightTo] = useState(props.city);
    const [flightFrom, setFlightFrom] = useState("");
    const [flightDeparture, setFlightDeparture] = useState("");
    const [flightArrival, setFlightArrival] = useState("");
    const [flightQuantity, setFlightQuantity] = useState(1);
    const [checkoutFlow, setCheckoutFlow] = useState("basicInfo");
    const [lastCity, setLastCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [hotelData, setHotelData] = useState([]);
    const [reservationData, setReservationData] = useState([]);
    const [address, setAddress] = useState({ name: "", email: "", address1: "", address2: "", city: "", state: "", country: "" });

    if (props.city && props.city != lastCity) {
        fetch("/api/getDestinationInfo?q=" + props.city)
            .then((data) => data.json())
            .then((data) => {
                setHotelData(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
        fetch(`/api/weather/?q=` + props.city)
            .then((data) => data.json())
            .then((data) => {
                setTemps(data);
            })
            .catch((err) => console.log(err));
        setLastCity(props.city);
        setCheckoutFlow("basicInfo");
        setLoading(true);
    }
    let inputTimer;
    return (
        <div className={styles.citycontent}>
            <Form
                className={styles.cityform}
                onSubmit={(e) => {
                    e.preventDefault();
                    //@ts-ignore
                    setCheckoutFlow(e.nativeEvent.submitter.name);
                    const arr = [];
                    for (let i = 0; i < flightQuantity; i++) arr.push({});
                    setReservationData([...arr]);
                }}
                action="/"
                method="GET"
            >
                <Form.Control type="hidden" name="to" value={props.city}></Form.Control>
                <Form.Row>
                    <Col sm={6}>
                        Location
                        <Form.Control
                            onChange={(e) => {
                                clearTimeout(inputTimer);
                                inputTimer = setTimeout(function () {
                                    setSearch(e.target.value);
                                }, 50);
                            }}
                            autoComplete="off"
                            onInput={(e) => checkoutFlow == "basicInfo" && setFlightFrom(e.target.value)}
                            id="flightFromSearch"
                            size="lg"
                            name="from"
                            placeholder="From"
                        />
                        <AutoComplete
                            setCity={(city) => {
                                setFlightFrom(city);
                            }}
                            searchValue={search}
                        ></AutoComplete>
                    </Col>
                    <Col sm={2}>
                        Departure
                        <Form.Control onInput={(e) => checkoutFlow == "basicInfo" && setFlightDeparture(e.target.value)} id="departure" size="lg" name="departure" type="date" placeholder="Departure" />
                    </Col>
                    <Col sm={2}>
                        Arrival
                        <Form.Control onInput={(e) => checkoutFlow == "basicInfo" && setFlightArrival(e.target.value)} id="arrival" size="lg" name="arrival" type="date" placeholder="Arrival" />
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
                                    <Col key={e.hotel.name} style={{ margin: "10px" }}>
                                        <Card style={{ margin: "0px", padding: "10px", height: "100%" }}>
                                            <div className={styles.hotelwrapper}>
                                                {e.hotel.media && <img className={`${styles.hotelimage} bigshadow`} src={i == 1 ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" : i == 2 ? "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1225&q=80" : e.hotel.media[0].uri}></img>}
                                                <div>
                                                    <div className={styles.hoteltitle}>{e.hotel.name}</div>
                                                    <div className={styles.hoteldescription}>{e.offers[0].room.description.text}</div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <div className={styles.hotelstitle}>Current weather at your destination</div>
                            <Row>
                                <Col>
                                    <Card style={{ textAlign: "center", height: "100%" }}>
                                        <h3 style={{ margin: "15px" }}>Temperature today</h3>
                                        <Line
                                            data={{
                                                type: "line",
                                                labels: Array.from(Array(24).keys()).map((_, j) => j + "h"),
                                                datasets: [
                                                    {
                                                        data: JSON.parse(temps.temps as any),
                                                        label: "Temperature",
                                                        borderColor: "#3e95cd",
                                                        fill: true,
                                                    },
                                                ],
                                            }}
                                        ></Line>
                                    </Card>
                                </Col>
                                <Col>
                                    <Row>
                                        {((temps as any).stats as any).map((el, i) => {
                                            return (
                                                <Col>
                                                    <Card style={{ padding: "20px", margin: "5px" }}>
                                                        <p>
                                                            <b>Day: </b>
                                                            {new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                        </p>
                                                        <p>
                                                            <b>Max temp: </b>
                                                            {el.maxtemp_c}°C
                                                        </p>
                                                        <p>
                                                            <b>Min temp: </b>
                                                            {el.mintemp_c}°C
                                                        </p>
                                                        <p>
                                                            <b>Avg temp: </b>
                                                            {el.avgtemp_c}°C
                                                        </p>
                                                        <img src={el.condition.icon}></img>
                                                        <p>
                                                            <b>Rain: </b>
                                                            {el.daily_chance_of_rain} %
                                                        </p>
                                                        <p>
                                                            <b>Snow: </b>
                                                            {el.daily_will_it_snow} %
                                                        </p>
                                                        <p>
                                                            <b>Humidity: </b>
                                                            {el.avghumidity} %
                                                        </p>
                                                    </Card>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            )}
            {checkoutFlow == "checkout" && (
                <>
                    <Row className={styles.passengers}>
                        {reservationData.map((i, item) => (
                            <Col md={2} key={item}>
                                <FontAwesomeIcon className={styles.usericon} icon={faUser}></FontAwesomeIcon>
                                <FormControl
                                    onChange={(e) => {
                                        let o = [...reservationData];
                                        o[item].firstname = e.target.value;
                                        setReservationData([...o]);
                                    }}
                                    size="lg"
                                    placeholder="First Name"
                                ></FormControl>
                                <br />
                                <FormControl
                                    onChange={(e) => {
                                        let o = [...reservationData];
                                        o[item].lastname = e.target.value;
                                        setReservationData([...o]);
                                    }}
                                    size="lg"
                                    placeholder="Last Name"
                                ></FormControl>
                                <br />
                                <FormControl
                                    onChange={(e) => {
                                        let o = [...reservationData];
                                        o[item].dateofbirth = e.target.value;
                                        setReservationData([...o]);
                                    }}
                                    size="lg"
                                    type="date"
                                    placeholder="Date of Birth"
                                ></FormControl>
                                <br />
                            </Col>
                        ))}
                    </Row>
                    <div className={styles.paypalwrapper}>
                        <ReactPayPalButton amount={5}></ReactPayPalButton>
                    </div>
                </>
            )}
        </div>
    );
};
export default CityContent;
