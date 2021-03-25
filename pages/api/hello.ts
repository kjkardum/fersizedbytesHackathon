// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiResponse } from "next";
import { APIWrapper } from "../../services/ApiWrapper";
import safeStringify from "../../util/safeStringify";

export default async (req, res: NextApiResponse) => {
    let api = new APIWrapper();

    res.setHeader("Content-Type", "application/json");

    res.end(
        safeStringify({
            test0: await api.GetLocationData("ALHR"),
        })
    );

    return true;
};
