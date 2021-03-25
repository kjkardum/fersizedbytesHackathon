import dontenv from "dotenv";
import Amadeus from "amadeus";

dontenv.config();

export class APIWrapper {
	amadeus;
	constructor() {
		this.amadeus = new Amadeus({
			clientId: process.env.AMADEUS_CLIENT_ID,
			clientSecret: process.env.AMADEUS_CLIENT_SECRET,
		});

		console.table({
			clientId: process.env.AMADEUS_CLIENT_ID,
			clientSecret: process.env.AMADEUS_CLIENT_SECRET,
		});
		console.log(this.amadeus);
	}
}
