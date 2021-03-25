import { MongoClient, Collection, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { string } from "joi";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_DB_CONNECTION_STRING);

client.connect(function (err) {
    console.log("Connected successfully to server");
});

export class Database {
    reservations: Collection<IReservation>;
    tickets: Collection<ITicketOrder>;
    users: Collection<IUser>;
    destinationSearchHistory: Collection<IDestionationSearchHistory>;

    constructor() {
        const db = client.db("takeoff");

        this.reservations = db.collection("reservations");
        this.tickets = db.collection("tickets");
        this.users = db.collection("users");
        this.destinationSearchHistory = db.collection("destinationSearchHIstory");
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

interface IPopularDestination {
    name: string;
    image: string;
    icons: Array<string>;
    description: string;
}
