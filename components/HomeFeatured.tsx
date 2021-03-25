import React from "react";
import styles from "../styles/HomeFeatured.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";

const HomeFeatured = (props) => (
    <Row className={styles.featured}>
        <Col md={{ order: !props.reverse ? "first" : "last" }}>
            <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" className={`${styles.featuredimage} bigshadow`}></img>
        </Col>
        <Col md={{ order: !props.reverse ? "last" : "first" }}>
            <div className={styles.featuredtitle}>Rio de Janeiro</div>
            <div className={styles.featuredicons}>
                <div className={styles.featurediconwrapper}>
                    <FontAwesomeIcon icon={faLandmark} className={styles.featuredicon} />
                </div>
                <div className={styles.featurediconwrapper}>
                    <FontAwesomeIcon icon={faUmbrellaBeach} className={styles.featuredicon} />
                </div>
            </div>
            <div className={styles.featureddescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac sem rutrum, pulvinar ipsum eu, sollicitudin magna. Maecenas auctor venenatis dolor, porttitor dictum augue eleifend a. Etiam mollis cursus tortor a condimentum. Fusce est ipsum, luctus id elit eget, fermentum tempor ligula. Nulla in sem ultricies ex congue pulvinar. Duis finibus nulla sed ornare interdum. Curabitur vulputate gravida sem, sed viverra elit lacinia nec. Nunc facilisis justo et quam tempus, ornare bibendum nisl suscipit. Mauris et mattis justo. Suspendisse potenti. Curabitur iaculis augue ante, sit amet viverra enim ultrices ac.</div>
        </Col>
    </Row>
);
export default HomeFeatured;
