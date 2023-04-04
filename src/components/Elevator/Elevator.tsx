import { ElevatorButton } from "../ElevatorButton/ElevatorButton";

import "./elevator.css";

export const Elevator = ({
  callFloor,
}: {
  callFloor: (floor: number) => void;
}) => {
  return (
    <div className="flexElevator">
      <ElevatorButton floor={5} callFloor={callFloor}></ElevatorButton>
      <ElevatorButton floor={4} callFloor={callFloor}></ElevatorButton>
      <ElevatorButton floor={3} callFloor={callFloor}></ElevatorButton>
      <ElevatorButton floor={2} callFloor={callFloor}></ElevatorButton>
      <ElevatorButton floor={1} callFloor={callFloor}></ElevatorButton>
      <ElevatorButton floor={0} callFloor={callFloor}></ElevatorButton>
    </div>
  );
};
