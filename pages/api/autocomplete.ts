// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiResponse } from "next";
import safeStringify from "../../util/safeStringify";

import url from "url";

import { airportNames } from "../../services/airports";

export default async (req, res: NextApiResponse) => {
    const current_url = new URL("https://www.google.com" + req.url);

    const fuzzyMatch = (s, p: string) => {
        if (p.length == 0) return false;

        p = p.split("").reduce((a, b) => a + "[^" + b + "]*" + b);
        return RegExp(p, "i").test(s);
    };

    res.setHeader("Content-Type", "application/json");

    let q = current_url.searchParams.get("q");
    if (!q) return res.end();

    let fuzzied = airportNames.filter((s) => s.split(" ").some((w) => fuzzyMatch(q, w))).slice(0, 100);

    fuzzied.sort((str1, str2) => (distance(str1, q) < distance(str2, q) ? 1 : -1));
    res.end(safeStringify(fuzzied.slice(0, 10)));

    return true;
};

function distance(val1, val2) {
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
