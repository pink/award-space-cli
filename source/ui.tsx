import React, {useState} from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import FlightTable from './FlightTable';

interface CLIProps {
  origin?: string;
  destination?: string;
  numSeats?: number;
  searchRT: boolean;
}

const App = (props: CLIProps) => {
  const [origin, setOrigin] = useState(props.origin || '');
  const [originInput, setOriginInput] = useState(props.origin || '');
  const [destination, setDestination] = useState(props.destination || '');
  const [destinationInput, setDestinationInput] = useState(
    props.destination || ''
  );
  const [numSeats, setNumSeats] = useState(props.numSeats || 0);
  const [numSeatsInput, setNumSeatsInput] = useState(props.numSeats || 0);
  const [searchRT, _] = useState(props.searchRT);

  const getOriginInput = (isFocused: boolean) => {
    return (
      <Box>
        <Box marginRight={1}>
          <Text>What's your starting airport (e.g. JFK)?:</Text>
        </Box>

        <TextInput
          value={origin}
          onChange={setOrigin}
          onSubmit={() => setOriginInput(origin)}
          focus={isFocused}
        />
      </Box>
    );
  };
  const getDestinationInput = (isFocused: boolean) => {
    return (
      <Box>
        <Box marginRight={1}>
          <Text>What's your destination airport (e.g. LAX)?:</Text>
        </Box>

        <TextInput
          value={destination}
          onChange={setDestination}
          onSubmit={() => setDestinationInput(destination)}
          focus={isFocused}
        />
      </Box>
    );
  };
  const getNumSeatsInput = (isFocused: boolean) => {
    return (
      <Box>
        <Box marginRight={1}>
          <Text>How many seats do you need (e.g. 4)?:</Text>
        </Box>

        <TextInput
          value={String(numSeats)}
          onChange={val => setNumSeats(Number.parseInt(val))}
          onSubmit={() => setNumSeatsInput(numSeats)}
          focus={isFocused}
        />
      </Box>
    );
  };

  return (
    <Box flexDirection="column">
      {getOriginInput(!originInput.length)}
      {getDestinationInput(!destinationInput.length && originInput.length > 0)}
      {getNumSeatsInput(
        !numSeatsInput && destinationInput.length > 0 && originInput.length > 0
      )}
      <br />
      {numSeatsInput &&
      destinationInput.length > 0 &&
      originInput.length > 0 ? (
        <FlightTable
          origin={originInput}
          destination={destinationInput}
          numSeats={numSeatsInput}
          searchRT={searchRT}
        />
      ) : null}
    </Box>
  );
};

module.exports = App;
export default App;
