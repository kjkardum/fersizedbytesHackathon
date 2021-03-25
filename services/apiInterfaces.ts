export interface IHotelOffers extends Array<any> {
    [offer: number]: {
        type: string;
        hotel: Hotel;
        available: boolean;
        offers?: OffersEntity[] | null;
    };
}
interface Hotel {
    type: string;
    hotelId: string;
    chainCode: string;
    dupeId: string;
    name: string;
    rating: string;
    cityCode: string;
    latitude: number;
    longitude: number;
    hotelDistance: HotelDistance;
    address: Address;
    contact: Contact;
    description: Description;
    amenities?: string[] | null;
    media?: MediaEntity[] | null;
}
interface HotelDistance {
    distance: number;
    distanceUnit: string;
}
interface Address {
    lines?: string[] | null;
    postalCode: string;
    cityName: string;
    countryCode: string;
}
interface Contact {
    phone: string;
    fax: string;
}
interface Description {
    lang: string;
    text: string;
}
interface MediaEntity {
    uri: string;
    category: string;
}
interface OffersEntity {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    rateCode: string;
    rateFamilyEstimated: RateFamilyEstimated;
    room: Room;
    guests: Guests;
    price: Price;
    policies: Policies;
}
interface RateFamilyEstimated {
    code: string;
    type: string;
}
interface Room {
    type: string;
    typeEstimated: TypeEstimated;
    description: Description1;
}
interface TypeEstimated {
    category: string;
    beds: number;
    bedType: string;
}
interface Description1 {
    text: string;
}
interface Guests {
    adults: number;
}
interface Price {
    currency: string;
    base: string;
    total: string;
    variations: Variations;
}
interface Variations {
    average: Average;
    changes?: ChangesEntity[] | null;
}
interface Average {
    base: string;
}
interface ChangesEntity {
    startDate: string;
    endDate: string;
    base: string;
}
interface Policies {
    guarantee: Guarantee;
    paymentType: string;
    cancellation: Cancellation;
}
interface Guarantee {
    acceptedPayments: AcceptedPayments;
}
interface AcceptedPayments {
    creditCards?: string[] | null;
    methods?: string[] | null;
}
interface Cancellation {
    numberOfNights: number;
    deadline: string;
}
