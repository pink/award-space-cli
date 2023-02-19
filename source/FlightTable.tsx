import React, { useState, useEffect } from 'react';
import Table from 'ink-table';
import Spinner from 'ink-spinner';
import { findOpenSeats } from './FlightAPI';
import { Box, Text } from 'ink';

interface FlightTableProps {
  origin: string;
  destination: string;
  numSeats: number;
  searchRT: boolean;
}

type FlightTableSchema = {
  Date: string;
  Airlines: string;
  Origin: string;
  Dest: string;
  '# of Seats in Business': string;
  '# of Seats in First': string;
};

const FlightTable = (props: FlightTableProps) => {
  const [flightDataDeparture, setFlightDataDeparture] = useState<
    FlightTableSchema[] | undefined
  >();
  const [flightDataReturn, setFlightDataReturn] = useState<FlightTableSchema[]>(
    [],
  );

  useEffect(() => {
    const loadFlightData = async () => {
      const fetchFlights = async (origin, dest) => {
        const data = await findOpenSeats(origin, dest, props.numSeats);

        return data.map((d) => {
          return {
            Date: d.Date,
            Airlines: d.JAirlines,
            Origin: d.Route.OriginAirport,
            Dest: d.Route.DestinationAirport,
            '# of Seats in Business': String(d.JRemainingSeats),
            '# of Seats in First': String(d.FRemainingSeats),
          };
        });
      };
      const departingFlights = await fetchFlights(
        props.origin,
        props.destination,
      );

      if (props.searchRT) {
        const returnFlights = await fetchFlights(
          props.destination,
          props.origin,
        );
        setFlightDataReturn(returnFlights);
      }

      setFlightDataDeparture(departingFlights);
    };

    loadFlightData();
  }, []);

  const loadingDataComponent = (
    <Text>
      <Text color="green">
        <Spinner type="dots" />
      </Text>
      {' Loading flight data...'}
    </Text>
  );

  const flightResultComponent = () => {
    const departingFlights = (
      <Box flexDirection="column">
        <Text bold={true} inverse={true}>
          {'\n'}🛫 Departing Flights:{'\n'}
        </Text>
        {flightDataDeparture.length > 0 ? (
          <Table data={flightDataDeparture} />
        ) : (
          <Text>{'\n'}No routes found 😭.</Text>
        )}
      </Box>
    );
    const returnFlights = (
      <Box flexDirection="column">
        <Text bold={true} inverse={true}>
          {'\n'}🛬 Returning Flights:{'\n'}
        </Text>
        {flightDataReturn.length > 0 ? (
          <Table data={flightDataReturn} />
        ) : (
          <Text>{'\n'}No routes found 😭.</Text>
        )}
      </Box>
    );

    return (
      <Box flexDirection="column">
        {departingFlights}
        {props.searchRT ? returnFlights : null}
      </Box>
    );
  };

  return (
    <Box>
      {!flightDataDeparture ? loadingDataComponent : flightResultComponent()}
    </Box>
  );
};

export default FlightTable;
