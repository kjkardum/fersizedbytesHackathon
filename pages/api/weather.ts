// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IHotelOffers } from "../../services/apiInterfaces";
import { APIWrapper } from "../../services/ApiWrapper";
import safeStringify from "../../util/safeStringify";
import airports from "../../services/airports.json";

import dotenv from "dotenv";
dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let api = new APIWrapper();

    const current_url = new URL("https://www.google.com" + req.url);

    let q = current_url.searchParams.get("q");
    let name = airports.filter((c) => q.toLowerCase() == c.iata_code.toLowerCase())[0]?.name;

    let data = await (await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${name}`)).json();

    res.setHeader("Content-Type", "application/json");
    res.end(safeStringify(data.forecast.forecastday[0].hour.map((c) => c.temp_c)));
};
