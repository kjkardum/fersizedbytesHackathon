import React, { useState } from "react";
import styles from "../styles/AnimatedBackground.module.css";

function main(props) {
    return (
        <div className={styles.main}>
            <img className={styles.svg} src="/cloud.svg"></img>
        </div>
    );
}

export default main;
