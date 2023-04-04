import { MouseEventHandler } from "react";
import { Elevator } from "../Elevator";
import { IconButton } from "../IconButton";
import "./floor.css";

export const Floor = ({
  floorNumber,
  elevator = false,
  onClickUp,
  onClickDown,
  callFloor,
}: {
  floorNumber: number;
  elevator?: boolean;
  onClickUp: MouseEventHandler<HTMLButtonElement>;
  onClickDown: MouseEventHandler<HTMLButtonElement>;
  callFloor: (floor: number) => void;
}) => {
  return (
    <div className="floorGrid">
      <div className="elevatorFlex">
        <h1>{floorNumber}</h1>
        {elevator ? <Elevator callFloor={callFloor}></Elevator> : null}
      </div>
      <div className="buttons">
        <IconButton icon="ArrowUp" onClick={onClickUp} />
        <IconButton icon="ArrowDown" onClick={onClickDown} />
      </div>
    </div>
  );
};
