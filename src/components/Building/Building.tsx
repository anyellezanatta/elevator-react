import { useElevatorReact } from "@/hooks/useElevatorReact";
import { Floor } from "../Floor";
import "./building.css";

export const Building = () => {
  const { allFloors, step, callUp, callDown, callFloor } = useElevatorReact();
  return (
    <div className="buildingFlex">
      {allFloors.map((floor) => {
        if (step.floor === floor) {
          return (
            <div key={floor}>
              <Floor
                key={floor}
                floorNumber={floor}
                elevator
                onClickDown={() => callDown(floor)}
                onClickUp={() => callUp(floor)}
                callFloor={callFloor}></Floor>

              {`stop ${step.stop}`}
            </div>
          );
        } else
          return (
            <Floor
              key={floor}
              floorNumber={floor}
              onClickDown={() => callDown(floor)}
              onClickUp={() => callUp(floor)}
              callFloor={callFloor}></Floor>
          );
      })}
    </div>
  );
};
