import { useEffect, useRef, useState } from "react";
import { rangeDesc, removeBy, sortBy } from "@/lib/utils";

type Direction = "Up" | "Down";

type ElevatorSteps = {
  floor: number;
  direction?: Direction;
};

const isNextCallGoingToSameDirection = (
  calls: ElevatorSteps[],
  nextFloor: ElevatorSteps,
  currentDirection: Direction,
): boolean => {
  const callUndefined = calls.filter((call) => {
    return (
      call.direction === undefined &&
      (currentDirection === "Up" ? call.floor > nextFloor.floor : call.floor < nextFloor.floor)
    );
  });

  const callDirection = calls.filter((call) => {
    return currentDirection === "Up" ? call.floor > nextFloor.floor : call.floor < nextFloor.floor;
  });

  return !!callDirection.length || !!callUndefined.length;
};

const getDirection = (currentFloor: ElevatorSteps, nextFloor: ElevatorSteps): Direction => {
  return nextFloor.floor > currentFloor.floor ? "Up" : "Down";
};

const getNextStop = (calls: ElevatorSteps[], current: ElevatorSteps) => {
  if (!current.direction) {
    return calls[0];
  } else {
    const ups = sortBy(
      calls.filter((call) => call.floor > current.floor),
      "floor",
      "ascending",
    );

    const downs = sortBy(
      calls.filter((call) => call.floor < current.floor),
      "floor",
      "descending",
    );

    if (current.direction === "Up") {
      const callsSorted = ups.concat(downs);

      return callsSorted[0];
    } else if (current.direction === "Down") {
      const callsSorted = downs.concat(ups);

      return callsSorted[0];
    }
  }
};

export const useElevator = (floorCount = 6, initialFloor = 0, delay = 1000) => {
  const allFloors = rangeDesc(floorCount, 5);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [elevatorCalls, setElevatorCalls] = useState<ElevatorSteps[]>([]);
  const [currentFloor, setCurrentFloor] = useState<ElevatorSteps>({
    floor: initialFloor,
    direction: "Up",
  });

  useEffect(() => {
    // Respond to elevator calls
    if (!elevatorCalls.length) return;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      const nextStop = getNextStop(elevatorCalls, currentFloor);
      if (!nextStop) return;

      const nextStepTemp =
        nextStop.floor > currentFloor.floor ? currentFloor.floor + 1 : currentFloor.floor - 1;

      if (
        nextStepTemp === nextStop.floor &&
        (nextStop.direction === currentFloor.direction ||
          nextStop.direction === undefined ||
          !isNextCallGoingToSameDirection(elevatorCalls, nextStop, currentFloor.direction || "Up"))
      ) {
        setCurrentFloor({
          floor: nextStop.floor,
          direction: getDirection(currentFloor, nextStop),
        });

        const newElevatorCalls = removeBy(elevatorCalls, "floor", nextStop.floor);

        setElevatorCalls(newElevatorCalls);
      } else {
        setCurrentFloor({
          floor: nextStepTemp,
          direction: getDirection(currentFloor, nextStop),
        });
      }
    }, delay);
  }, [currentFloor, delay, elevatorCalls]);

  const isFloorCalled = (floor: number) => {
    return elevatorCalls.some((c) => c.floor === floor);
  };

  /**
   * Calls the elevator down from the outside
   * @param floor The caller floor
   * @returns void
   */
  const callUp = (floor: number) => {
    if (isFloorCalled(floor)) return;
    setElevatorCalls((current) => [...current, { floor, direction: "Up" }]);
  };

  /**
   * Calls the elevator up from the outside
   * @param floor The caller floor
   * @returns void
   */
  const callDown = (floor: number) => {
    if (isFloorCalled(floor)) return;
    setElevatorCalls((current) => [...current, { floor, direction: "Down" }]);
  };

  /**
   * When somebody calls the elevator from inside, therefore no direction
   * @param floor The desired floor
   * @returns void
   */
  const callFloor = (floor: number) => {
    if (isFloorCalled(floor)) return;
    setElevatorCalls((current) => [...current, { floor }]);
  };

  return {
    allFloors,
    step: currentFloor,
    callUp,
    callDown,
    callFloor,
    elevatorCalls,
  };
};
