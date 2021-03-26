import React from "react";
import styles from "../styles/HomeContent.module.css";

import { Row, Col } from "react-bootstrap";
import HomeFeatured from "./HomeFeatured";
import { FlightMap } from "./FlightMap";

const HomeContent = (props) => (
    <div className={styles.homecontent}>
        <div className={styles.featureddestinations}>Popular Destination</div>
        <HomeFeatured description="Rio de Janeiro is the second largest city in Brazil, on the South Atlantic coast. Rio is famous for its breathtaking landscape, its laid back beach culture and its annual carnival. Although, their soccer skills here are very well recognized." title="Rio de Janeiro" image="https://images.unsplash.com/photo-1519046904884-53103b34b206?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"></HomeFeatured>
        <hr className={styles.mobilehr}></hr>
        <HomeFeatured reverse={true} title="London" description="London, city, capital of the United Kingdom. It is among the oldest of the world's great cities—its history spanning nearly two millennia—and one of the most cosmopolitan. By far Britain's largest metropolis, it is also the country's economic, transportation, and cultural centre." image="https://images.adsttc.com/media/images/5ced/70a5/284d/d1e7/0300/041f/large_jpg/03_cutaway-london-big-ben.jpg?1559064722"></HomeFeatured>
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
