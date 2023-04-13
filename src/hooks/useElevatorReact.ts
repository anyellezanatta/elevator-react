import { range } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useTimeout } from "./useTimeout";

type Direction = "Up" | "Down";

type ElevatorCall = {
  floor: number;
  direction?: Direction;
};
type ElevatorSteps = {
  floor: number;
  stop: boolean;
  direction?: Direction;
};

const sortAscendant = (a: ElevatorCall, b: ElevatorCall) => {
  return a.floor - b.floor;
};

const sortDescendent = (a: ElevatorCall, b: ElevatorCall) => {
  return b.floor - a.floor;
};
const getDirection = (currentFloor: number, nextFloor: number): Direction => {
  return nextFloor > currentFloor ? "Up" : "Down";
};

export const useElevatorReact = (floorCount = 6, initialFloor = 0) => {
  const allFloors = range(floorCount, 5);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [elevatorCalls, setElevatorCalls] = useState<ElevatorCall[]>([]);
  const [currentFloor, setCurrentFloor] = useState<ElevatorSteps>({
    floor: initialFloor,
    stop: false,
  });

  const getNextStop = (calls: ElevatorCall[], current: ElevatorSteps) => {
    if (!current.direction) {
      return calls[0];
    } else {
      const ups = calls
        .filter((call) => call.floor > current.floor)
        .sort(sortAscendant);
      const downs = calls
        .filter((call) => call.floor < current.floor)
        .sort(sortDescendent);

      console.log("ups", ups);
      console.log("downs", downs);

      if (current.direction === "Up" || downs.length === 0) {
        const callsSorted = ups.concat(downs);

        return callsSorted[0];
      } else if (current.direction === "Down" || ups.length === 0) {
        const callsSorted = downs.concat(downs);

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
      console.log(nextStop);
      if (!nextStop) return;

      const nextStepTemp =
        nextStop.floor > currentFloor.floor
          ? currentFloor.floor + 1
          : currentFloor.floor - 1;

      if (nextStepTemp !== nextStop.floor) {
        console.log("set floor", nextStepTemp);
        setCurrentFloor({
          floor: nextStepTemp,
          direction: getDirection(currentFloor.floor, nextStepTemp),
          stop: false,
        });
      } else {
        console.log("set floor", nextStop.floor);

        setCurrentFloor({
          floor: nextStop.floor,
          direction: getDirection(currentFloor.floor, nextStop.floor),
          stop: true,
        });

        const newElevatorCalls = elevatorCalls.filter((call) => {
          const a = call.floor === nextStop?.floor;
          const b = call.direction === nextStop?.direction || !call.direction;
          console.log("a", a);
          console.log("b", b);

          console.log("call floor", call.floor);
          console.log("call direction", call.direction);
          return !(a && b);
        });
        console.log("next Stop", nextStop?.floor);
        console.log("next direction", nextStop?.direction);
        console.log("elevator calls", elevatorCalls);
        console.log("new elevator", newElevatorCalls);
        setElevatorCalls(newElevatorCalls);
      }
    }, 1000);
  }, [currentFloor, elevatorCalls]);

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
