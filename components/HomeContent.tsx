import React from "react";
import styles from "../styles/HomeContent.module.css";

import {Row, Col} from "react-bootstrap";
import HomeFeatured from "./HomeFeatured";

const HomeContent = (props) => (
    <div className={styles.homecontent}>
        <HomeFeatured></HomeFeatured>
        <HomeFeatured reverse={true}></HomeFeatured>
    </div>
)
export default HomeContent;
