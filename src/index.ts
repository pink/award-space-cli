import fetch from 'node-fetch';

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

async function loadFlightAvailability(
  source: string
): Promise<FlightAvailability[] | null> {
  const response = await fetch(AERO_API + `?source=${source}`);
  const data = await response.json();
  if (!data) {
    return null;
  }

  return data as FlightAvailability[];
}

function findOpenSeats(
  flightData: FlightAvailability[],
  origin: string,
  destination: string
): FlightAvailability[] {
  return flightData.filter(flight => {
    return (
      flight.Route.OriginAirport === origin &&
      flight.Route.DestinationAirport === destination &&
      (flight.JAvailable || flight.FAvailable)
    );
  });
}

function formatFlightData(
  flightData: FlightAvailability[],
  origin: string,
  destination: string
): void {
  console.log(
    `\nCurrent Flight Availability between ${origin} and ${destination}\n\n`
  );

  flightData
    .sort((a, b) => a.Date.localeCompare(b.Date))
    .forEach(flight => {
      console.log(
        `* Date: ${new Date(flight.Date).toLocaleDateString('en-US')}`
      );
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

async function main() {
  const origin = 'JFK';
  const destination = 'HND';
  const flightData = await loadFlightAvailability('united');
  const openSeats = findOpenSeats(flightData, origin, destination);
  const openSeatsReturn = findOpenSeats(flightData, destination, origin);
  formatFlightData(openSeats, origin, destination);
  formatFlightData(openSeatsReturn, destination, origin);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.log(e);
  }
})();

export {};
