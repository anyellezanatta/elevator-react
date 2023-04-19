import { useElevatorReact } from "@/hooks/useElevatorReact";
import { Floor } from "../Floor";
import "./building.css";

export const Building = () => {
  const { allFloors, step, callUp, callDown, callFloor, elevatorCalls } =
    useElevatorReact();
  return (
    <div className="flex building">
      {allFloors.map((floor) => {
        const elevatorCall = elevatorCalls.find((elevatorCall) => {
          return elevatorCall.floor === floor;
        });
        return (
          <div key={floor}>
            <Floor
              key={floor}
              floorNumber={floor}
              isElevator={step.floor === floor}
              isCalled={
                elevatorCall && elevatorCall.direction === undefined
                  ? true
                  : false
              }
              isUp={elevatorCall ? elevatorCall.direction === "Up" : false}
              isDown={elevatorCall ? elevatorCall.direction === "Down" : false}
              onClickDown={() => callDown(floor)}
              onClickUp={() => callUp(floor)}
              callFloor={callFloor}></Floor>
          </div>
        );
      })}
    </div>
  );
};
