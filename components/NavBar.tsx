import React from "react";
import styles from "../styles/NavBar.module.css";

const NavBar = (props) => (
    <div className={styles.navbar}>
        <div className={styles["navbar-nav"]}>
            <a className={styles["navbar-item"]} href="/home">
                Home
            </a>
            <a className={styles["navbar-item"]} href="/buy">
                Buy Flight
            </a>
            <a className={styles["navbar-item"]} href="/reserve">
                Make a reservation
            </a>
            <a className={styles["navbar-item"]} href="/login">
                Login
            </a>
        </div>
    </div>
);
export default NavBar;
