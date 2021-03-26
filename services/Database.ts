import { MongoClient, Collection, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { string } from "joi";

import { IncomingMessage } from "http";

import firebase from "firebase-admin";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

dotenv.config();

if (firebase.apps.length === 0 || firebase.apps.filter((a) => a.name == "admin").length === 0)
    firebase.initializeApp(
        {
            credential: firebase.credential.cert({
                projectId: process.env.PROJECT_ID,
                privateKey: process.env.PRIVATE_KEY,
                clientEmail: process.env.CLIENT_EMAIL,
            }),
            databaseURL: "https://hackathon-e676b.firebaseapp.com",
        },
        "admin"
    );

const admin = firebase.app("admin");

class DB {
    reservations: Collection<IReservation>;
    tickets: Collection<ITicketOrder>;
    users: Collection<IUser>;
    destinationSearchHistory: Collection<IDestionationSearchHistory>;
    popularPlaces: Collection<IPopularPlace>;

    constructor() {
        var client = new MongoClient(process.env.MONGODB_DB_CONNECTION_STRING);

        var connected = false;

        client.connect((err) => {
            if (err) return console.log(err);
            console.log("Connected successfully to server");
            connected = true;

            const db = client.db("takeoff");

            this.reservations = db.collection("reservations");
            this.tickets = db.collection("tickets");
            this.users = db.collection("users");
            this.destinationSearchHistory = db.collection("destinationSearchHistory");
            this.popularPlaces = db.collection("popularPlaces");
        });
    }

    public Reserve = async (reservation: IReservation): Promise<string> => {
        let res = await this.reservations.insertOne(reservation);
        if (res.result.ok && res.insertedCount == 1) return res.insertedId.toHexString();
        else return null;
    };

    public CancleReservation = async (reservation: string, user: string): Promise<boolean> => {
        let res = await this.reservations.updateOne({ user: new ObjectId(user), _id: new ObjectId(reservation) }, { status: "canceled" });
        if (res.result.ok && res.modifiedCount == 1) return true;
        return false;
    };

    public GetUserReservations = async (user: string): Promise<Array<IReservation>> => {
        return await this.reservations.find({ user: new ObjectId(user) }).toArray();
    };

    public BuyTicket = async (ticket: ITicketOrder): Promise<string> => {
        let res = await this.tickets.insertOne(ticket);
        if (res.result.ok && res.insertedCount == 1) return res.insertedId.toHexString();
        else return null;
    };

    public GetUserTickets = async (user: string): Promise<Array<ITicketOrder>> => {
        return await this.tickets.find({ user: new ObjectId(user) }).toArray();
    };

    public PushSearchHistory = async (code: string) => {
        let res = await this.destinationSearchHistory.findOne({ code });
        let today = new Date().toLocaleString().split(",")[0];

        if (res) {
            if (res.hits[today])
                this.destinationSearchHistory.updateOne(
                    {
                        code,
                    },
                    {
                        //@ts-ignore
                        $inc: { hitsTotal: 1, hits: { [today]: 1 } },
                    }
                );
            else
                this.destinationSearchHistory.updateOne(
                    {
                        code,
                    },
                    {
                        $inc: { hitsTotal: 1 },
                        hits: { [today]: 1 },
                    }
                );
        } else
            this.destinationSearchHistory.insertOne({
                code,
                hitsTotal: 1,
                hits: {
                    [today]: 1,
                },
            });
    };

    public GetMostSearched = async (): Promise<Array<IDestionationSearchHistory>> => {
        return (await this.destinationSearchHistory.aggregate([{ $sort: { total: -1 } }, { $limit: 5 }])).toArray();
    };

    public GetSearchData = async (code: string): Promise<IDestionationSearchHistory> => {
        return this.destinationSearchHistory.findOne({ code });
    };

    public GenerateAuthToken = async (userToken: string): Promise<string> => {
        let user = await firebase.app("admin").auth().verifyIdToken(userToken, true);

        let authCookie = {
            tok: crypto.randomBytes(18).toString("base64"),
            uid: user.uid,
        };

        return jwt.sign(authCookie, process.env.JWT_SIGN_PRIVATE_KEY, { expiresIn: "60 days" });
    };

    public AddPopularPlace = async (popularPlace: IPopularPlace): Promise<string> => {
        let res = await this.popularPlaces.insertOne(popularPlace);
        if (res.result.ok && res.insertedCount == 1) return res.insertedId.toHexString();
        else return null;
    };

    public RemovePopularPlace = async (placeId: string): Promise<boolean> => {
        let res = await this.popularPlaces.deleteOne({ _id: new ObjectId(placeId) });
        if (res.result.ok && res.deletedCount == 1) return true;
        return false;
    };

    public GetPopularPlaces = async (): Promise<Array<IPopularPlace>> => {
        return await this.popularPlaces.find({}).toArray();
    };
}

export const Database = new DB();

interface IPopularPlace {
    name: string;
    description: string;
    image: string;
}

interface IReservation {
    user: ObjectId;
    reservedAt: string;

    date: string;
    flight: string;
    tickets: number;
    status: "valid" | "canceled";
}

interface IUser {}

interface ITicketOrder {
    user: ObjectId;
    bookedAt: string;
    tickets: Array<{
        name: string;
        surname: string;
        birth: string;
        passport: string;
    }>;
    flight: string;
}

interface IDestionationSearchHistory {
    code: string;
    hitsTotal: number;
    hits: {
        [date: number]: number;
    };
}

interface IUser {
    level: "user" | "admin" | "worker";
    uid: string;
}
