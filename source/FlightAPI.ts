import axios from 'axios';

interface Route {
	ID: string;
	OriginAirport: string;
	OriginRegion: string;
	DestinationAirport: string;
	DestinationRegion: string;
	NumDaysOut: number;
	Distance: number;
	Source: string;
	AutoCreated: boolean;
}

interface FlightAvailability {
	ID: string;
	RouteID: string;
	Route: Route;
	Date: string;
	ParsedDate: string;

	YAvailable: boolean;
	WAvailable: boolean;
	JAvailable: boolean;
	FAvailable: boolean;

	YMileageCost: string;
	WMileageCost: string;
	JMileageCost: string;
	FMileageCost: string;

	YRemainingSeats: number;
	WRemainingSeats: number;
	JRemainingSeats: number;
	FRemainingSeats: number;

	YAirlines: string;
	WAirlines: string;
	JAirlines: string;
	FAirlines: string;

	YDirect: boolean;
	WDirect: boolean;
	JDirect: boolean;
	FDirect: boolean;

	Source: string;
	ComputedLastSeen: string;
	APITermsOfUse: string;
}

const AERO_API = 'https://seats.aero/api/availability';

export async function loadFlightAvailability(
	source: string
): Promise<FlightAvailability[]> {
	const response = await axios.get(AERO_API + `?source=${source}`);
	if (!response) {
		throw new Error('Failed to fetch flight availability.');
	}

	return response.data as FlightAvailability[];
}

export async function findOpenSeats(
	origin: string,
	destination: string,
	numSeats: number = 1,
	flightData?: FlightAvailability[]
): Promise<FlightAvailability[]> {
	if (!flightData) {
		flightData = await loadFlightAvailability('united');
	}

	return flightData
		.filter(flight => {
			return (
				flight.Route.OriginAirport === origin &&
				flight.Route.DestinationAirport === destination &&
				Math.max(flight.JRemainingSeats, flight.FRemainingSeats) >= numSeats &&
				(flight.JAvailable || flight.FAvailable)
			);
		})
		.sort((a, b) => a.Date.localeCompare(b.Date));
}

export function formatFlightData(
	origin: string,
	destination: string,
	flightData: FlightAvailability[]
): void {
	console.log(
		`\nCurrent Flight Availability between ${origin} and ${destination}\n\n`
	);

	flightData.forEach(flight => {
		console.log(`* Date: ${new Date(flight.Date).toLocaleDateString('en-US')}`);
		console.log(`Airline: ${flight.JAirlines}`);

		if (flight.JAvailable) {
			console.log(`Business Seats Remaining: ${flight.JRemainingSeats}`);
			console.log(`# of Miles Needed: ${flight.JMileageCost}`);
		}
		if (flight.FAvailable) {
			console.log(`First Class Seats Remaining: ${flight.FRemainingSeats}`);
			console.log(`# of Miles Needed: ${flight.FMileageCost}`);
		}
		console.log('\n');
	});
}

// Example usage
async function main() {
	const origin = 'JFK';
	const destination = 'HND';
	const flightData = await loadFlightAvailability('united');
	const openSeats = await findOpenSeats(origin, destination, 1, flightData);
	const openSeatsReturn = await findOpenSeats(
		destination,
		origin,
		1,
		flightData
	);
	formatFlightData(origin, destination, openSeats);
	formatFlightData(destination, origin, openSeatsReturn);
}
