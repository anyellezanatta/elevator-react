import { range } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Direction = "Up" | "Down";

type ElevatorCall = {
  floor: number;
  direction?: Direction;
};
type ElevatorSteps = {
  floor: number;
  direction?: Direction;
};

const sortAscending = (a: ElevatorCall, b: ElevatorCall) => {
  return a.floor - b.floor;
};

const sortDescending = (a: ElevatorCall, b: ElevatorCall) => {
  return b.floor - a.floor;
};
const existNextCallSameDirection = (
  calls: ElevatorCall[],
  nextFloor: ElevatorSteps,
  currentDirection: Direction,
) => {
  const callUndefined = calls.filter((call) => {
    return (
      call.direction === undefined &&
      (currentDirection === "Up"
        ? call.floor > nextFloor.floor
        : call.floor < nextFloor.floor)
    );
  });

  const callDirection = calls.filter((call) => {
    return currentDirection === "Up"
      ? call.floor > nextFloor.floor
      : call.floor < nextFloor.floor;
  });

  return callDirection.length || callUndefined.length;
};
const getDirection = (
  currentFloor: ElevatorSteps,
  nextFloor: ElevatorSteps,
): Direction | undefined => {
  return nextFloor.floor > currentFloor.floor ? "Up" : "Down";
};

export const useElevatorReact = (floorCount = 6, initialFloor = 0) => {
  const allFloors = range(floorCount, 5);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [elevatorCalls, setElevatorCalls] = useState<ElevatorCall[]>([]);
  const [currentFloor, setCurrentFloor] = useState<ElevatorSteps>({
    floor: initialFloor,
    direction: "Up",
  });

  const getNextStop = (calls: ElevatorCall[], current: ElevatorSteps) => {
    if (!current.direction) {
      return calls[0];
    } else {
      const ups = calls
        .filter((call) => call.floor > current.floor)
        .sort(sortAscending);
      const downs = calls
        .filter((call) => call.floor < current.floor)
        .sort(sortDescending);

      if (current.direction === "Up") {
        const callsSorted = ups.concat(downs);

        return callsSorted[0];
      } else if (current.direction === "Down") {
        const callsSorted = downs.concat(ups);

        return callsSorted[0];
      }
    }
  };

  useEffect(() => {
    // Respond to elevator calls
    if (!elevatorCalls.length) return;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      const nextStop = getNextStop(elevatorCalls, currentFloor);
      console.log("nextStop", nextStop);
      console.log("currentFloor", currentFloor);
      if (!nextStop) return;

      const nextStepTemp =
        nextStop.floor > currentFloor.floor
          ? currentFloor.floor + 1
          : currentFloor.floor - 1;

      console.log("nextStepTemp", nextStepTemp);

      if (
        nextStepTemp === nextStop.floor &&
        (nextStop.direction === currentFloor.direction ||
          nextStop.direction === undefined ||
          !existNextCallSameDirection(
            elevatorCalls,
            nextStop,
            currentFloor.direction || "Up",
          ))
      ) {
        console.log("set floor true", nextStop.floor);

        setCurrentFloor({
          floor: nextStop.floor,
          direction: getDirection(currentFloor, nextStop),
        });

        const newElevatorCalls = elevatorCalls.filter((call) => {
          return call.floor !== nextStop.floor;
        });

        setElevatorCalls(newElevatorCalls);
      } else {
        console.log("set floor false", nextStepTemp);

        setCurrentFloor({
          floor: nextStepTemp,
          direction: getDirection(currentFloor, nextStop),
        });
      }
    }, 1000);
  }, [currentFloor, elevatorCalls, floorCount, initialFloor]);

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
