import { NextApiRequest, NextApiResponse } from "next";
import { APIWrapper, IFlightSearchSearch, VFlightSearch } from "../../services/ApiWrapper";
import { Database, ITicketOrder } from "../../services/Database";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let data = JSON.parse(req.body) as { order: ITicketOrder };

    console.table(req.cookies["X-T"]);

    let db = new Database();
    await db.init();

    let user = db.ValiadateAuthToken(req.cookies["X-T"] as string);

    data.order.user = user.uid;

    res.setHeader("Content-Type", "application/json");

    if (req.method == "POST") {
        return res.end(await db.BuyTicket(data.order));
    }

    return res.end("Invalid Request");
};
