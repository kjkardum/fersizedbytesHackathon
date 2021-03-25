import React, { useState } from "react";
import styles from "../styles/CityContent.module.css";
import { Line } from "react-chartjs-2";

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../services/config";

import { Row, Col, Form, Button } from "react-bootstrap";

const CityContent = (props) => {
    const [flightTo, setFlightTo] = useState(props.city);
    const [flightFrom, setFlightFrom] = useState("");
    const [flightDeparture, setFlightDeparture] = useState("");
    const [flightArrival, setFlightArrival] = useState("");
    const [flightQuantity, setFlightQuantity] = useState(1);
    const [checkoutFlow, setCheckoutFlow] = useState("basicInfo");
    return (
        <div className={styles.citycontent}>
            <Form
                className={styles.cityform}
                onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutFlow(e.nativeEvent.submitter.name);
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
                    <div className={styles.hotelstitle}>Hotels Nearby</div>
                    <Row>
                        <Col md={4}>
                            <img className={`${styles.hotelimage} bigshadow`} src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"></img>
                            <div className={styles.hoteltitle}>Hotel a</div>
                            <div className={styles.hoteldescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas posuere tristique. In tellus massa, tempor eu tincidunt ac, ornare nec elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum suscipit luctus est, eu dignissim arcu efficitur non. Cras pulvinar est risus, vitae ultricies ligula fringilla vitae. Duis vitae finibus odio. Aenean vulputate dapibus eros et laoreet. Suspendisse potenti. Morbi eros nunc, rutrum fermentum gravida a, mollis auctor nisi. Ut finibus, nisl sit amet viverra faucibus, turpis leo pulvinar quam, at tempor metus erat malesuada magna. Nulla convallis, lectus et semper porttitor, enim ipsum cursus diam, eget eleifend urna tellus eu sapien. Sed sit amet mauris ac sem aliquet tincidunt. Donec in ipsum vitae quam tempor maximus sed in eros. Praesent convallis, dolor ac gravida fermentum, ante justo sollicitudin turpis, sed congue nisl sapien ac dui. Quisque dictum, augue et ornare hendrerit, eros orci tempor elit, vel fermentum ligula leo ut magna. Cras sollicitudin tellus quis ultricies rhoncus.</div>
                        </Col>
                        <Col md={4}>
                            <img className={`${styles.hotelimage} bigshadow`} src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"></img>
                            <div className={styles.hoteltitle}>Hotel b</div>
                            <div className={styles.hoteldescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas posuere tristique. In tellus massa, tempor eu tincidunt ac, ornare nec elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum suscipit luctus est, eu dignissim arcu efficitur non. Cras pulvinar est risus, vitae ultricies ligula fringilla vitae. Duis vitae finibus odio. Aenean vulputate dapibus eros et laoreet. Suspendisse potenti. Morbi eros nunc, rutrum fermentum gravida a, mollis auctor nisi. Ut finibus, nisl sit amet viverra faucibus, turpis leo pulvinar quam, at tempor metus erat malesuada magna. Nulla convallis, lectus et semper porttitor, enim ipsum cursus diam, eget eleifend urna tellus eu sapien. Sed sit amet mauris ac sem aliquet tincidunt. Donec in ipsum vitae quam tempor maximus sed in eros. Praesent convallis, dolor ac gravida fermentum, ante justo sollicitudin turpis, sed congue nisl sapien ac dui. Quisque dictum, augue et ornare hendrerit, eros orci tempor elit, vel fermentum ligula leo ut magna. Cras sollicitudin tellus quis ultricies rhoncus.</div>
                        </Col>
                        <Col md={4}>
                            <img className={`${styles.hotelimage} bigshadow`} src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"></img>
                            <div className={styles.hoteltitle}>Hotel c</div>
                            <div className={styles.hoteldescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas posuere tristique. In tellus massa, tempor eu tincidunt ac, ornare nec elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum suscipit luctus est, eu dignissim arcu efficitur non. Cras pulvinar est risus, vitae ultricies ligula fringilla vitae. Duis vitae finibus odio. Aenean vulputate dapibus eros et laoreet. Suspendisse potenti. Morbi eros nunc, rutrum fermentum gravida a, mollis auctor nisi. Ut finibus, nisl sit amet viverra faucibus, turpis leo pulvinar quam, at tempor metus erat malesuada magna. Nulla convallis, lectus et semper porttitor, enim ipsum cursus diam, eget eleifend urna tellus eu sapien. Sed sit amet mauris ac sem aliquet tincidunt. Donec in ipsum vitae quam tempor maximus sed in eros. Praesent convallis, dolor ac gravida fermentum, ante justo sollicitudin turpis, sed congue nisl sapien ac dui. Quisque dictum, augue et ornare hendrerit, eros orci tempor elit, vel fermentum ligula leo ut magna. Cras sollicitudin tellus quis ultricies rhoncus.</div>
                        </Col>
                    </Row>
                    <Line data={{ labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050] }}></Line>;
                </>
            )}
        </div>
    );
};
export default CityContent;
