import { elevator } from "@/lib/elevator";
import { useRef } from "react";

export const useElevator = (
  onStep: (floor: number, stop: boolean) => void,
  initialFloor: number = 0,
) => {
  const elevatorRef = useRef(
    elevator({
      initialFloor,
      onStep,
    }),
  );

  return elevatorRef.current;
};
