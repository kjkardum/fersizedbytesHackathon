// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IHotelOffers } from "../../services/apiInterfaces";
import { APIWrapper } from "../../services/ApiWrapper";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let api = new APIWrapper();
    const current_url = new URL("https://www.google.com" + req.url);

    let q = current_url.searchParams.get("q");

    res.setHeader("Content-Type", "application/json");

    if (!q) return res.end({});
    return res.end(safeStringify((await api.GetHotelOffers(q)).slice(0, 3)));
};
