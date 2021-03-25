// Modified: https://stackoverflow.com/questions/43393136/js-create-smart-auto-complete
import React from "react";
import styles from "../styles/AutoComplete.module.css";
import { useState } from "react";

const AutoComplete = (props) => {
    const [cities, setCities] = useState([]);

    let inputValue = props.searchValue as string;
    if (inputValue.length > 2)
        fetch("/api/autocomplete?q=" + inputValue)
            .then((response) => response.json())
            .then((data) => setCities(data));

    return (
        <ul className={`${styles.autocompletelist} bigshadow`}>
            {cities.map((el, i) => {
                let s = matchingChars(el.name, inputValue);
                return (
                    <li
                        className={styles.autocompleteitem}
                        onClick={() => {
                            props.setCity(el.name);
                            if (props.mobile) {
                                props.closeMobile();
                            }
                        }}
                        key={`li_city_${i}`}
                    >
                        {el.name.split("").map((c, i) => (s.has(i) ? <b>{c}</b> : c))}
                    </li>
                );
            })}
        </ul>
    );
};

export default AutoComplete;

// Should be dp, not greedy, might change
function matchingChars(hay: String, needle: String) {
    let charIndicies = new Set();
    let i = 0,
        j = 0;
    while (i < hay.length && j < needle.length) {
        if (hay[i].toLowerCase() == needle[j].toLowerCase()) {
            charIndicies.add(i);
            ++i;
            ++j;
        } else ++i;
    }
    return charIndicies;
}
