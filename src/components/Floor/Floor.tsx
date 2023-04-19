import { MouseEventHandler } from "react";
import { IconButton } from "../IconButton";
import "./floor.css";
import classNames from "classnames";

export const Floor = ({
  floorNumber,
  isElevator,
  isCalled,
  isUp,
  isDown,
  onClickUp,
  onClickDown,
  callFloor,
}: {
  floorNumber: number;
  isElevator: boolean;
  isCalled: boolean;
  isUp: boolean;
  isDown: boolean;
  onClickUp: MouseEventHandler<HTMLButtonElement>;
  onClickDown: MouseEventHandler<HTMLButtonElement>;
  callFloor: (floor: number) => void;
}) => {
  return (
    <div className="flex floor">
      <div className="flex direction-buttons">
        <IconButton
          className={classNames({ "call-signal": isUp })}
          icon="ArrowUp"
          aria-label="Up"
          onClick={onClickUp}
        />
        <IconButton
          className={classNames({ "call-signal": isDown })}
          icon="ArrowDown"
          aria-label="Down"
          onClick={onClickDown}
        />
      </div>
      <button
        className={classNames("floor-elevator", {
          "call-signal": isCalled,
          elevator: isElevator,
        })}
        onClick={() => callFloor(floorNumber)}
        aria-label={`floor ${floorNumber}`}>
        {floorNumber}
      </button>
    </div>
  );
};
