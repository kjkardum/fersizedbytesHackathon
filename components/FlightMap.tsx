import React from "react";
import styles from "../styles/FlightMap.module.css";

const FlightMap = (props) => (
    <div>
        <div className={styles.flighttitle}>Flight status</div>
        <div className={styles.flightdescription}>Satellite images</div>
        <img src="demomap.png" className={styles.demomap}></img>
    </div>
);
export default FlightMap;
