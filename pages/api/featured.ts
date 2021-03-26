// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { database } from "firebase-admin";
import Joi from "joi";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { APIWrapper, IFlightSearchSearch, IPopularPlace, VFlightSearch } from "../../services/ApiWrapper";
import { Database } from "../../services/Database";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let api = new APIWrapper();

    let pp = await Database.GetPopularPlaces();

    res.setHeader("Content-Type", "application/json");

    let data = JSON.parse(req.body) as IPopularPlace;

    const current_url = new URL("https://www.google.com" + req.url);
    let i = parseInt(current_url.searchParams.get("i"));

    if (req.method == "GET") {
        return res.end(
            safeStringify({
                pp,
            })
        );
    } else if (req.method == "POST") {
        Database.UpdatePopularPlace({ index: i, ...data });
        res.end();
    }
    return res.end("Invalid Request");
};
