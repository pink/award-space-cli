#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './ui';

const cli = meow(
  `
  Usage
    $ award-space-cli

  Options (all are optional):
    --origin  Starting airport (e.g. JFK)
    --destination  Destination airport (e.g. HND)
    --numSeats  Number of seats to search for
    --rt Look for flights roundtrip

  Examples
    $ award-space-cli --origin=JFK --destination=HND --numSeats=2
`,
  {
    flags: {
      origin: {
        type: 'string',
      },
      destination: {
        type: 'string',
      },
      numSeats: {
        type: 'number',
      },
      rt: {
        type: 'boolean',
      },
    },
  },
);

render(
  <App
    origin={cli.flags.origin}
    destination={cli.flags.destination}
    numSeats={cli.flags.numSeats}
    searchRT={cli.flags.rt}
  />,
);
