import { useElevator } from "@/hooks/useElevator";
import { Floor } from "@/components/Floor";
import "./building.css";

export const Building = () => {
  const { allFloors, step, callUp, callDown, callFloor, elevatorCalls } = useElevator();
  return (
    <div className="flex building">
      {allFloors.map((floor) => {
        const elevatorCall = elevatorCalls.find((elevatorCall) => {
          return elevatorCall.floor === floor;
        });

        return (
          <Floor
            key={floor}
            floorNumber={floor}
            isElevatorPresent={step.floor === floor}
            isCalled={!!elevatorCall && !elevatorCall.direction}
            isUp={elevatorCall?.direction === "Up"}
            isDown={elevatorCall?.direction === "Down"}
            onClickDown={() => callDown(floor)}
            onClickUp={() => callUp(floor)}
            callFloor={callFloor}
          />
        );
      })}
    </div>
  );
};
