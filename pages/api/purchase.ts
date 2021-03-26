import { NextApiRequest, NextApiResponse } from "next";
import { APIWrapper, IFlightSearchSearch, VFlightSearch } from "../../services/ApiWrapper";
import { Database, ITicketOrder } from "../../services/Database";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let api = new APIWrapper();
    res.setHeader("Content-Type", "application/json");

    let data = JSON.parse(req.body) as ITicketOrder;

    if (req.method == "POST") {
        Database.BuyTicket(data);
    }

    return res.end("Invalid Request");
};
