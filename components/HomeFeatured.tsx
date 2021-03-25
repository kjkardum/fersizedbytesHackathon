import React from "react";
import styles from "../styles/HomeFeatured.module.css";

import {Row, Col} from "react-bootstrap";

const HomeFeatured = (props) => (
    <Row className={styles.featured}>
        <Col md={{ order: !props.reverse ? 'first' : 'last' }} >
            <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                className={`${styles.featuredimage} bigshadow`}></img>
        </Col>
        <Col md={{ order: !props.reverse ? 'last' : 'first' }} >
            <div className={styles.featuredtitle}>Rio de Janeiro</div>
        </Col>
    </Row>
)
export default HomeFeatured;
