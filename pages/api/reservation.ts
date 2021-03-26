import { NextApiRequest, NextApiResponse } from "next";
import { APIWrapper, IFlightSearchSearch, VFlightSearch } from "../../services/ApiWrapper";
import { Database, IReservation, ITicketOrder } from "../../services/Database";
import safeStringify from "../../util/safeStringify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let db = new Database();
    await db.init();
    let user = db.ValiadateAuthToken(req.cookies["X-T"] as string);

    res.setHeader("Content-Type", "application/json");

    let reservation = JSON.parse(req.body) as { id: string } & IReservation;

    reservation.user = user.uid;

    console.table(reservation);

    if (req.method == "GET") {
        return res.end(JSON.stringify(await db.GetUserReservations(reservation.user)));
    } else if (req.method == "POST") {
        return res.end(await db.Reserve(reservation));
    } else if (req.method == "DELETE") {
        //@ts-ignore
        await db.CancelReservation(reservation._id, user.uid);
        return res.end();
    }

    return res.end("Invalid Request");
};
