// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IHotelOffers } from "../../services/apiInterfaces";
import { APIWrapper } from "../../services/ApiWrapper";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let api = new APIWrapper();

    res.setHeader("Content-Type", "application/json");
    return res.end(safeStringify({}));
};
