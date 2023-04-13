import { MouseEventHandler } from "react";
import { Elevator } from "../Elevator";
import { IconButton } from "../IconButton";
import "./Floor.css";

export const Floor = ({
  floorNumber,
  elevator = false,
  onClickUp,
  onClickDown,
  callFloor,
  allFloor,
}: {
  allFloor: number[];
  floorNumber: number;
  elevator?: boolean;
  onClickUp: MouseEventHandler<HTMLButtonElement>;
  onClickDown: MouseEventHandler<HTMLButtonElement>;
  callFloor: (floor: number) => void;
}) => {
  return (
    <div className="flex floor">
      <div className="flex direction-buttons">
        <IconButton icon="ArrowUp" onClick={onClickUp} />
        <IconButton icon="ArrowDown" onClick={onClickDown} />
      </div>
      <div className="flex floor-elevator">
        <h1>{floorNumber}</h1>
        {elevator ? (
          <Elevator allFloor={allFloor} callFloor={callFloor}></Elevator>
        ) : null}
      </div>
    </div>
  );
};
