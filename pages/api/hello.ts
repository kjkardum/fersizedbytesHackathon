// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IHotelOffers } from "../../services/apiInterfaces";
import { APIWrapper } from "../../services/ApiWrapper";
import { Database } from "../../services/Database";

import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.table(req.headers);

    let db = new Database();
    await db.init();

    res.setHeader("Content-Type", "application/json");
    return res.end(safeStringify(await db.GetUserReservations("test")));
};
