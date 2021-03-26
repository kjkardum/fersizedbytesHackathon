import React from "react";
import styles from "../styles/HomeContent.module.css";

import { Row, Col } from "react-bootstrap";
import HomeFeatured from "./HomeFeatured";
import { FlightMap } from "./FlightMap";

const HomeContent = (props) => (
    <div className={styles.homecontent}>
        <div className={styles.featureddestinations}>Popular Destination</div>
        <HomeFeatured></HomeFeatured>
        <hr className={styles.mobilehr}></hr>
        <HomeFeatured reverse={true}></HomeFeatured>
        <hr className={styles.mobilehr}></hr>

        <FlightMap
            center={{
                lat: 45,
                lng: 15,
            }}
            zoom={6}
        />
    </div>
);
export default HomeContent;
