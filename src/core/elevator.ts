enum Direction {
  Up,
  Down,
  Stopped,
}

type FloorCall = { floor: number; direction: Direction };

export const elevator = () => {
  let stops: number[] = [];
  let currentFloor: number = 0;
  let currentStatus: Direction = Direction.Stopped;
  let floorCalls: FloorCall[] = [];

  const calcNextStop = () => {
    stops = [currentFloor];
    let stopSlice: number[];
    floorCalls.map((fc) => {
      console.log(fc);
      if (fc.floor == currentFloor) return;
      if (currentStatus == Direction.Stopped || fc.direction == currentStatus) {
        stops.forEach((stop, i) => {
          if (fc.direction == Direction.Down) {
            if (stop <= fc.floor) {
              stopSlice = stops.slice(i, stops.length - 1);
            }
            if (stop >= fc.floor) {
              //TODO: ????
            }
          }
          if (fc.direction == Direction.Up) {
            if (stop >= fc.floor) {
              stopSlice = stops.slice(i, stops.length - 1);
            }

            if (stop <= fc.floor) {
              //TODO: ??
            }
          }
        });
        stops = [...stopSlice, fc.floor];
      }
    });

    console.log("STOPS" + stops);
  };

  const callUp = (floor: number) => {
    if (floorCalls.some((fc) => fc.floor == floor)) return;

    floorCalls = [...floorCalls, { floor, direction: Direction.Down }];
    //calcNextStop();
  };

  const callDown = (floor: number) => {
    if (floorCalls.some((fc) => fc.floor == floor)) return;

    floorCalls = [...floorCalls, { floor: floor, direction: Direction.Up }];
    //calcNextStop();
  };

  const pushDestination = (floor: number) => {
    if (floorCalls.some((fc) => fc.floor == floor)) return;

    if (currentFloor > floor) {
      floorCalls = [...floorCalls, { floor: floor, direction: Direction.Down }];
    } else if (currentFloor < floor) {
      floorCalls = [...floorCalls, { floor: floor, direction: Direction.Up }];
    }
    // calcNextStop();
  };

  return {
    callUp,
    callDown,
    pushDestination,
    get calls(): FloorCall[] {
      return floorCalls;
    },
  };
};

export type ElevatorType = ReturnType<typeof elevator>;
