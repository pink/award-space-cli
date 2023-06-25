# award-space-cli 🛫

A CLI for searching through award space - ✨ powered by https://seats.aero ✨.

Test

## Install

```bash
$ git clone git@github.com:pink/award-space-cli.git
$ npm install --global
```

## CLI

```
$ award-space-cli --help

  Usage
    $ award-space-cli

  Options (all are optional):
    --origin  Starting airport (e.g. JFK)
    --destination  Destination airport (e.g. HND)
    --numSeats  Number of seats to search for
		--rt Look for flights roundtrip

  Examples
    $ award-space-cli --origin=JFK --destination=HND --numSeats=2

    What's your starting airport (e.g. JFK)?: JFK
    What's your destination airport (e.g. LAX)?: HND
    How many seats do you need (e.g. 4)?: 2
    ┌────────────┬────────────┬────────────────────────┬─────────────────────┐
    │ Date       │ Airlines   │ # of Seats in Business │ # of Seats in First │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-06 │ LH, LX     │ 9                      │ 0                   │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-07 │ LH, LX, NH │ 9                      │ 0                   │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-08 │ LH, LX, NH │ 9                      │ 0                   │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-09 │ LH, LX     │ 5                      │ 0                   │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-13 │ LH, LX, NH │ 9                      │ 0                   │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-14 │ LX, NH     │ 9                      │ 0                   │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-20 │ LH, LX, NH │ 9                      │ 0                   │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-21 │ LX, NH     │ 5                      │ 0                   │
    ├────────────┼────────────┼────────────────────────┼─────────────────────┤
    │ 2023-02-22 │ NH         │ 4                      │ 0                   │
    └────────────┴────────────┴────────────────────────┴─────────────────────┘
```
