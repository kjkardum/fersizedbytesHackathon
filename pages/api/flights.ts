// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Joi from "joi";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { APIWrapper, IFlightSearchSearch, VFlightSearch } from "../../services/ApiWrapper";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let api = new APIWrapper();
    res.setHeader("Content-Type", "application/json");

    console.log(req.body);

    console.log(typeof req.body);

    let data = JSON.parse(req.body) as IFlightSearchSearch;

    console.table(data);

    if (req.method == "POST") {
        let flights = await api.SearchFlights(data);

        return res.end(
            safeStringify({
                flights,
            })
        );
    }

    return res.end("Invalid Request");
};
