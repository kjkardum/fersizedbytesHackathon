import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/NavBar.module.css";
import { faEllipsisV, fas, faSearch, faHome, faUser, faSuitcaseRolling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileSearch from "./MobileSearch";

const NavBar = (props: { user: boolean; hideMobileSearch?: boolean; setCity: (city: any) => void }) => {
    let [navbox, toggleNavbox] = useState(false);
    let [searchview, toggleSearchview] = useState(false);
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles["navbar-nav"]}>
                    <Link href="/">
                        <a className={styles["navbar-item"]} href="#">
                            Home
                        </a>
                    </Link>
                    {props.user && (
                        <Link href="/myReservations">
                            <a className={styles["navbar-item"]} href="#">
                                My reservations
                            </a>
                        </Link>
                    )}

                    {/* <a className={styles["navbar-item"]} href="/buy">
                        Buy Flight
                    </a>
                    <a className={styles["navbar-item"]} href="/reserve">
                        Make a reservation
                    </a> */}
                    <Link href="/login">
                        <a className={styles["navbar-item"]} href="#">
                            {props.user ? "Logout" : "Login"}
                        </a>
                    </Link>
                </div>
                <div className={styles.navbuttons}>
                    <div className={`${styles.navbox} bigshadow` + (navbox ? ` ${styles.navboxactive}` : "")}>
                        <Link href="/">
                            <a className={styles.navboxlink} href="#" onClick={() => toggleNavbox(false)}>
                                <FontAwesomeIcon icon={faHome} className={styles.navboxicon}></FontAwesomeIcon> Home
                            </a>
                        </Link>
                        <Link href="/myReservations">
                            <a className={styles.navboxlink} href="#" onClick={() => toggleNavbox(false)}>
                                <FontAwesomeIcon icon={faSuitcaseRolling} className={styles.navboxicon}></FontAwesomeIcon> My Reservations
                            </a>
                        </Link>
                        {/*<a className={styles.navboxlink} href="/buy" onClick={() => toggleNavbox(false)}>
                            <FontAwesomeIcon icon={faPlane} className={styles.navboxicon}></FontAwesomeIcon> Buy tickets
                        </a>
                        <a className={styles.navboxlink} href="/reserve" onClick={() => toggleNavbox(false)}>
                            <FontAwesomeIcon icon={faAddressCard} className={styles.navboxicon}></FontAwesomeIcon> Reservations
                        </a> */}
                        <Link href="/login">
                            <a className={styles.navboxlink} href="#" onClick={() => toggleNavbox(false)}>
                                <FontAwesomeIcon icon={faUser} className={styles.navboxicon}></FontAwesomeIcon>
                                {props.user ? "Logout" : "Login"}
                            </a>
                        </Link>
                    </div>
                    {!props.hideMobileSearch && (
                        <div className={styles.navbutton}>
                            <FontAwesomeIcon icon={faSearch} className={styles.navicon} onClick={() => toggleSearchview(true)} />
                        </div>
                    )}
                    <div className={styles.navbutton}>
                        <FontAwesomeIcon icon={faEllipsisV} className={styles.navicon} onClick={() => toggleNavbox(!navbox)} />
                    </div>
                </div>
            </div>
            <MobileSearch setCity={(city) => props.setCity(city)} open={searchview} close={() => toggleSearchview(false)}></MobileSearch>
        </>
    );
};
export default NavBar;
