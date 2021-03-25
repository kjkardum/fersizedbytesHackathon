// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiResponse } from "next";
import safeStringify from "../../util/safeStringify";

import airports from "../../services/airports.json";

export default async (req, res: NextApiResponse) => {
    const current_url = new URL("https://www.google.com" + req.url);

    res.setHeader("Content-Type", "application/json");

    let q = current_url.searchParams.get("q");
    if (!q) return res.end();

    let arr = airports.map((y) => y.name);

    arr.sort((str1, str2) => (distance(str1, q) < distance(str2, q) ? 1 : -1));
    arr = arr.slice(0, 10);
    arr.sort((str1, str2) => (matchingCharsNum(str1, q) < matchingCharsNum(str2, q) ? 1 : -1));

    res.end(safeStringify(arr));

    return true;
};

function distance(val1: string, val2: string) {
    let longer, shorter, longerlth, result;

    if (val1.length > val2.length) {
        longer = val1;
        shorter = val2;
    } else {
        longer = val2;
        shorter = val1;
    }

    longerlth = longer.length;

    result = (longerlth - editDistance(longer, shorter)) / parseFloat(longerlth);

    return result;
}

function editDistance(val1, val2) {
    val1 = val1.toLowerCase();
    val2 = val2.toLowerCase();

    let costs = [];

    for (let i = 0; i <= val1.length; i++) {
        let lastVal = i;
        for (let j = 0; j <= val2.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else if (j > 0) {
                let newVal = costs[j - 1];
                if (val1.charAt(i - 1) !== val2.charAt(j - 1)) {
                    newVal = Math.min(Math.min(newVal, lastVal), costs[j]) + 1;
                }
                costs[j - 1] = lastVal;
                lastVal = newVal;
            }
        }
        if (i > 0) {
            costs[val2.length] = lastVal;
        }
    }

    return costs[val2.length];
}

// Should be dp, not greedy, might change
function matchingCharsNum(hay: String, needle: String) {
    let charIndicies = new Set();
    let i = 0,
        j = 0;
    while (i < hay.length && j < needle.length) {
        if (hay[i].toLowerCase() == needle[j].toLowerCase()) {
            ++i;
            ++j;
        } else ++i;
    }
    return j;
}
