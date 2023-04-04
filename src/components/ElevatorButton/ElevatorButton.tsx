import "./elevatorButton.css";
export const ElevatorButton = ({
  floor,
  callFloor,
}: {
  floor: number;
  callFloor: (floor: number) => void;
}) => {
  return (
    <button className="button" onClick={() => callFloor(floor)}>
      {floor}
    </button>
  );
};
