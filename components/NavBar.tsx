import React from "react";
import styles from "../styles/NavBar.module.css";

const NavBar = (props) => (
    <div className={styles.navbar}>
        <div className={styles['navbar-nav']}>
          <a className={styles['navbar-item']} href="#">Home</a>
          <a className={styles['navbar-item']} href="#">Buy Flight</a>
          <a className={styles['navbar-item']} href="#">Make a reservation</a>
          <a className={styles['navbar-item']} href="#">Login</a>
        </div>
      </div>
)
export default NavBar;
