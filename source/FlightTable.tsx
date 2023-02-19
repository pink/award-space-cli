import React, {useState, useEffect} from 'react';
import Table from 'ink-table';
import Spinner from 'ink-spinner';
import {findOpenSeats} from './FlightAPI';
import {Box, Text} from 'ink';

interface FlightTableProps {
  origin: string;
  destination: string;
  numSeats: number;
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
  const [flightData, setFlightData] = useState<FlightTableSchema[] | undefined>();

  useEffect(() => {
    const loadFlightData = async () => {
      const data = await findOpenSeats(
        props.origin,
        props.destination,
        props.numSeats
      );

      const formattedData: FlightTableSchema[] = data.map(d => {
        return {
          Date: d.Date,
          Airlines: d.JAirlines,
          Origin: d.Route.OriginAirport,
          Dest: d.Route.DestinationAirport,
          '# of Seats in Business': String(d.JRemainingSeats),
          '# of Seats in First': String(d.FRemainingSeats),
        };
      });
      setFlightData(formattedData);
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

  return (
    <Box>
      {
        !flightData ?
          loadingDataComponent :
          (flightData.length > 0 ? <Table data={flightData} /> : <Text>{"\n"}No routes found 😭.</Text>)
      }
    </Box>
  );
};

export default FlightTable;
