import "./Elevator.css";

export const Elevator = ({
  callFloor,
  allFloor,
}: {
  callFloor: (floor: number) => void;
  allFloor: number[];
}) => {
  return (
    <div className="flex elevator">
      {allFloor.map((floor) => {
        return (
          <button
            className="elevator-button"
            key={floor}
            onClick={() => callFloor(floor)}>
            {floor}
          </button>
        );
      })}
    </div>
  );
};
