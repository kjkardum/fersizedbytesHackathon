import React, { useState } from "react";
import styles from "../styles/MobileSearch.module.css";
import { faSearch, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoComplete from "./AutoComplete";

const MobileSearch = (props) => {
    const [search, setSearch] = useState("");
    return (
        <div className={`${styles.mobilesearch}` + (props.open ? ` ${styles.mobilesearchactive}` : "")}>
            <FontAwesomeIcon className={styles.searchreturn} icon={faCaretLeft} onClick={() => props.close()}></FontAwesomeIcon>
            <span className={styles.placestext}>Places</span>
            <hr />
            <div className={styles.reldiv}>
                <input onChange={(e) => setSearch(e.target.value)} className={styles.mobilesearchbox} autoComplete="off" type="search" id="flightSearch" name="q" aria-label="Search flights" placeholder="Find a flight"></input>
                <AutoComplete setCity={(city) => props.setCity(city)} closeMobile={() => props.close()} autoComplete="off" mobile={true} searchValue={search}></AutoComplete>
            </div>
        </div>
    );
};
export default MobileSearch;
