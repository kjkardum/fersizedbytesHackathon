import * as http from "http";
import * as fs from "fs";
import { Database } from "../../services/Database";
import safeStringify from "../../util/safeStringify";

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
    let search = {};
    req.url
        .split("?")[1]
        ?.split("&")
        .forEach((cc) => {
            let [c, v] = cc.split("=");
            search[c] = v;
        });

    console.table(search);

    let authToken = await Database.GenerateAuthToken(search["token"]);

    console.table(authToken);

    res.writeHead(302, {
        "Set-Cookie": `X-T=${authToken}; Path=/; HttpOnly`,
        "Content-Type": "application/json",
        Location: "/",
    });

    res.end(safeStringify(req));
};
