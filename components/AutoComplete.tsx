// Modified: https://stackoverflow.com/questions/43393136/js-create-smart-auto-complete

import { useState } from "react";

const main = (props) => {
    const [cities, setCities] = useState([]);

    let inputValue = props.searchValue as string;
    if (inputValue.length > 2)
        fetch("/api/autocomplete?q=" + inputValue)
            .then((response) => response.json())
            .then((data) => setCities(data));

    return (
        <ul>
            {cities.map((el, i) => {
                let s = matchingChars(el, inputValue);
                return (
                    <li
                        onClick={() => {
                            props.setCity(el);
                            console.log(el);
                        }}
                        key={`li_city_${i}`}
                    >
                        {el.split("").map((c, i) => (s.has(i) ? <b>{c}</b> : c))}
                    </li>
                );
            })}
        </ul>
    );
};

export default main;

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
