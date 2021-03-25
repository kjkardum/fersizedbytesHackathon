// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Joi from "joi";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { APIWrapper, IFlightSearchSearch, VFlightSearch } from "../../services/ApiWrapper";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let api = new APIWrapper();
    res.setHeader("Content-Type", "application/json");

    if (req.body && req.body.length > 1) return res.end({ erorr: "No body" });

    let data = JSON.parse(req.body) as IFlightSearchSearch;

    let val = VFlightSearch.validate(data);
    if (val.error) return res.end({ erorr: val.error });

    if (req.method == "GET") {
        let flights = await api.SearchFlights(data);

        return res.end(
            safeStringify({
                flights,
            })
        );
    }

    return res.end();
};
