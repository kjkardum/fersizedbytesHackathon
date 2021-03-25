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
    }

    public SearchFlights = async (search: IFlightSearchSearch): Promise<IFlightSearchResoult> => {
        return (await this.amadeus.shopping.flightOffersSearch.get(search)).data;
    };
}

export interface IFlightSearchSearch {
    originLocationCode?: string;
    destinationLocationCode?: string;
    departureDate?: string;
    adults?: string;
}
export interface IFlightSearchResoult {
    [key: string]: {
        type: "flight-offer";
        id: number;
        source: string;
        instantTicketingRequired: boolean;
        nonHomogeneous: boolean;
        oneWay: boolean;
        lastTicketingDate: string;
        numberOfBookableSeats: number;
        itineraries: Array<{
            duration: string;
            segments: Array<{
                departure: {
                    iataCode: string;
                    terminal: string;
                    at: string;
                };
                arrival: {
                    iataCode: string;
                    terminal: string;
                    at: string;
                };
                carrierCode: string;
                number: string;
                aircraft: {
                    code: string;
                };
                operating: {
                    carrierCode: string;
                };
                duration: string;
                id: string;
                numberOfStops: number;
                blacklistedInEU: false;
            }>;
        }>;
        price: {
            currency: string;
            total: string;
            base: string;
            fees: Array<{
                amount: string;
                type: string;
            }>;

            grandTotal: string;
        };
        pricingOptions: {
            fareType: Array<string>;
            includedCheckedBagsOnly: boolean;
        };
        validatingAirlineCodes: Array<string>;
        travelerPricings: [
            {
                travelerId: string;
                fareOption: string;
                travelerType: string;
                price: {
                    currency: string;
                    total: string;
                    base: string;
                };
                fareDetailsBySegment: Array<{
                    segmentId: string;
                    cabin: string;
                    fareBasis: string;
                    class: string;
                    includedCheckedBags: {
                        weight: number;
                        weightUnit: string;
                    };
                }>;
            }
        ];
    };
}
