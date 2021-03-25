// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IHotelOffers } from "../../services/apiInterfaces";
import { APIWrapper } from "../../services/ApiWrapper";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let api = new APIWrapper();

    res.setHeader("Content-Type", "application/json");

    if (req.body && req.body.length > 0) {
        let cityCode = JSON.parse(req.body).cityCode;
        return res.end(safeStringify((await api.GetHotelOffers(cityCode)).slice(0, 3)));
    }

    return res.end();
};
