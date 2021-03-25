import React, { useState } from "react";
import styles from "../styles/NavBar.module.css";
import { faEllipsisV, fas, faSearch, faHome, faPlane, faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = (props) => {
    let [navbox, toggleNavbox] = useState(false);
    return (
        <div className={styles.navbar}>
            <div className={styles["navbar-nav"]}>
                <a className={styles["navbar-item"]} href="#">
                    Home
                </a>
                <a className={styles["navbar-item"]} href="#">
                    Buy Flight
                </a>
                <a className={styles["navbar-item"]} href="#">
                    Make a reservation
                </a>
                <a className={styles["navbar-item"]} href="#">
                    Login
                </a>
            </div>
            <div className={styles.navbuttons}>
                <div className={`${styles.navbox} bigshadow` + (navbox ? ` ${styles.navboxactive}` : "")}>
                    <a className={styles.navboxlink} href="#" onClick={() => toggleNavbox(false)}>
                        <FontAwesomeIcon icon={faHome} className={styles.navboxicon}></FontAwesomeIcon> Home
                    </a>
                    <a className={styles.navboxlink} href="#" onClick={() => toggleNavbox(false)}>
                        <FontAwesomeIcon icon={faPlane} className={styles.navboxicon}></FontAwesomeIcon> Buy tickets
                    </a>
                    <a className={styles.navboxlink} href="#" onClick={() => toggleNavbox(false)}>
                        <FontAwesomeIcon icon={faAddressCard} className={styles.navboxicon}></FontAwesomeIcon> Reservations
                    </a>
                    <a className={styles.navboxlink} href="#" onClick={() => toggleNavbox(false)}>
                        <FontAwesomeIcon icon={faUser} className={styles.navboxicon}></FontAwesomeIcon> Login
                    </a>
                </div>
                <div className={styles.navbutton}>
                    <FontAwesomeIcon icon={faSearch} className={styles.navicon} />
                </div>
                <div className={styles.navbutton}>
                    <FontAwesomeIcon icon={faEllipsisV} className={styles.navicon} onClick={() => toggleNavbox(!navbox)} />
                </div>
            </div>
        </div>
    );
};
export default NavBar;
