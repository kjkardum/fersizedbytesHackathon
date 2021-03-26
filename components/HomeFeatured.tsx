import React from "react";
import { useState } from "react";
import styles from "../styles/HomeFeatured.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark, faUmbrellaBeach, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";

const HomeFeatured = (props) => {
    const [isOpen, open] = useState(false);
    return (
        <Row className={styles.featured}>
            <Col className={styles.featuredimagebox} md={{ order: !props.reverse ? "first" : "last" }}>
                <img src={props.image} className={`${styles.featuredimage} bigshadow`}></img>
            </Col>
            <Col className={styles.featureddetails} md={{ order: !props.reverse ? "last" : "first" }}>
                <div className={styles.featuredtitle}>
                    {props.title}
                    <FontAwesomeIcon icon={faCaretDown} className={styles.featuredexpand} onClick={() => open(!isOpen)}></FontAwesomeIcon>
                </div>
                <div className={styles.featuredicons}>
                    <div className={styles.featurediconwrapper}>
                        <FontAwesomeIcon icon={faLandmark} className={styles.featuredicon} />
                    </div>
                    <div className={styles.featurediconwrapper}>
                        <FontAwesomeIcon icon={faUmbrellaBeach} className={styles.featuredicon} />
                    </div>
                </div>
                <div className={styles.featureddescription}>{props.description}</div>
            </Col>
            <div className={`${styles.mobiledescription}` + (isOpen ? ` ${styles.mobiledescriptionactive}` : ``)}>{props.description}</div>
        </Row>
    );
};
export default HomeFeatured;
