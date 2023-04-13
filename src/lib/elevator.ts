import { closest, range, rangeUp } from "./utils";

type ElevatorConfig = {
  onStep?: (floor: number, stop: boolean) => void;
  stepDelayMs?: number;
  initialFloor?: number;
  floorCount?: number;
};

type Direction = "Up" | "Down";

type ElevatorCall = {
  floor: number;
  direction?: Direction;
};

const findNearest = (
  calls: ElevatorCall[],
  current: number,
  direction?: Direction,
) => {
  let nearest;

  if (!direction) {
    nearest = closest(
      calls.map((call) => call.floor),
      current,
    );
  } else if (direction === "Up") {
    nearest = Math.min(
      ...calls.map((call) => call.floor).filter((floor) => floor > current),
    );
  } else if (direction === "Down") {
    nearest = Math.max(
      ...calls.map((call) => call.floor).filter((floor) => floor < current),
    );
  }
  return nearest === -Infinity || nearest === Infinity ? current : nearest;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const elevator = ({
  initialFloor = 0,
  floorCount = 6,
  stepDelayMs = 1000,
  onStep,
}: ElevatorConfig) => {
  let elevatorCalls: ElevatorCall[] = [];
  const allFloors = rangeUp(floorCount);

  const start = () => {
    let currentFloor = initialFloor;
    let currentDirection: Direction | undefined;

    const internalFunction = () => {
      console.log("init next step");
      elevatorCalls = elevatorCalls.filter((c) => c.floor !== currentFloor);

      if (!elevatorCalls.length) return;

      const nextStop = findNearest(
        elevatorCalls,
        currentFloor,
        currentDirection,
      );

      if (nextStop === currentFloor) {
        currentDirection = currentDirection === "Down" ? "Up" : "Down";
      }

      if (nextStop && nextStop !== currentFloor) {
        currentDirection = currentFloor > nextStop ? "Down" : "Up";

        //Find nexts steps for the next stop
        const steps =
          currentDirection === "Up"
            ? rangeUp(nextStop - currentFloor - 1, currentFloor + 1)
            : range(currentFloor - nextStop - 1, currentFloor - 1);

        if (steps.length) {
          currentFloor = steps[0];
          if (onStep) onStep(currentFloor, false);
          stepDelayMs = 500;
        } else {
          currentFloor = nextStop;
          if (onStep) onStep(currentFloor, true);
          stepDelayMs = 2000;
        }
      }
      setTimeout(internalFunction, stepDelayMs);
    };

    const stopInterval = setTimeout(internalFunction, stepDelayMs);

    return () => clearTimeout(stopInterval);
  };

  const isFloorCalled = (floor: number) => {
    return elevatorCalls.some((c) => c.floor === floor);
  };

  const callUp = (floor: number) => {
    if (isFloorCalled(floor)) return;
    elevatorCalls = [...elevatorCalls, { floor, direction: "Up" }];
    console.log("callUP " + floor);
  };

  const callDown = (floor: number) => {
    if (isFloorCalled(floor)) return;
    elevatorCalls = [...elevatorCalls, { floor, direction: "Down" }];
    console.log("callDown " + elevatorCalls);
  };

  const callFloor = (floor: number) => {
    if (isFloorCalled(floor)) return;
    elevatorCalls = [...elevatorCalls, { floor }];
    console.log("call floor " + floor);
  };

  return {
    allFloors,
    start,
    callUp,
    callDown,
    callFloor,
  };
};
