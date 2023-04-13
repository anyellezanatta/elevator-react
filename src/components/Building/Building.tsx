import { useElevatorReact } from "@/hooks/useElevatorReact";
import { Floor } from "../Floor";
import "./Building.css";

export const Building = () => {
  const { allFloors, step, callUp, callDown, callFloor } = useElevatorReact();
  return (
    <div className="flex building">
      {allFloors.map((floor) => {
        if (step.floor === floor) {
          return (
            <div key={floor}>
              <Floor
                key={floor}
                allFloor={allFloors}
                floorNumber={floor}
                elevator
                onClickDown={() => callDown(floor)}
                onClickUp={() => callUp(floor)}
                callFloor={callFloor}></Floor>

              {step.stop ? `stop ${step.stop}` : null}
            </div>
          );
        } else
          return (
            <Floor
              key={floor}
              floorNumber={floor}
              allFloor={allFloors}
              onClickDown={() => callDown(floor)}
              onClickUp={() => callUp(floor)}
              callFloor={callFloor}></Floor>
          );
      })}
    </div>
  );
};
