import "./ElevatorButton.css";
export const ElevatorButton = ({
  floor,
  callFloor,
}: {
  floor: number;
  callFloor: (floor: number) => void;
}) => {
  return (
    <button className="elevator-button" onClick={() => callFloor(floor)}>
      {floor}
    </button>
  );
};
