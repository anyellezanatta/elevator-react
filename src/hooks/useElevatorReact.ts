import { closest, rangeDown, rangeUp } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTimeout } from "./useTimeout";

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
type ElevatorSteps = {
  floor: number;
  stop: boolean;
};

export const useElevatorReact = (
  floorCount: number = 6,
  initialFloor: number = 0,
) => {
  const allFloors = rangeDown(floorCount, 5);
  const [step, setStep] = useState<ElevatorSteps>({
    floor: initialFloor,
    stop: false,
  });

  const [currentFloor, setCurrentFloor] = useState<ElevatorSteps>({
    floor: initialFloor,
    stop: false,
  });
  const [currentDirection, setCurrentDirection] = useState<Direction>();
  const [elevatorCalls, setElevatorCalls] = useState<ElevatorCall[]>([]);

  let stop: boolean;

  useEffect(() => {
    // Respond to elevator calls
    findNextStop();
  }, [elevatorCalls]);

  useEffect(() => {
    findNextStop();
  }, [step]);

  useTimeout(
    () => {
      setStep({ floor: currentFloor.floor, stop: currentFloor.stop });
      setElevatorCalls(
        elevatorCalls.filter((c) => c.floor !== currentFloor.floor),
      );
    },
    1000,
    [currentFloor.floor],
  );

  const isFloorCalled = (floor: number) => {
    return elevatorCalls.some((c) => c.floor === floor);
  };

  const findNextStop = () => {
    if (!elevatorCalls.length) return;

    const nextStop = findNearest(
      elevatorCalls,
      currentFloor.floor,
      currentDirection,
    );

    if (nextStop === currentFloor.floor) {
      setCurrentDirection(currentDirection === "Down" ? "Up" : "Down");
    }

    if (nextStop !== undefined && nextStop !== currentFloor.floor) {
      if (currentFloor.floor > nextStop) {
        setCurrentDirection("Down");
      } else setCurrentDirection("Up");

      stepsToNextStop(nextStop);
      //Find nexts steps for the next stop
    }
  };

  const stepsToNextStop = (nextStop: number) => {
    const steps =
      currentDirection === "Up" || nextStop > currentFloor.floor
        ? rangeUp(nextStop - currentFloor.floor - 1, currentFloor.floor + 1)
        : rangeDown(currentFloor.floor - nextStop - 1, currentFloor.floor - 1);

    console.log(steps);
    if (steps.length) {
      setCurrentFloor({ floor: steps[0], stop: false });
    } else {
      setCurrentFloor({ floor: nextStop, stop: true });
    }
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
    setElevatorCalls((current) => [...current, { floor, direction: "Up" }]);
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
    step,
    callUp,
    callDown,
    callFloor,
  };
};
