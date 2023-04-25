import { MouseEventHandler } from "react";
import classNames from "classnames";
import { IconButton } from "@/components/IconButton";
import "./floor.css";

export const Floor = ({
  floorNumber,
  isElevatorPresent,
  isCalled,
  isUp,
  isDown,
  onClickUp,
  onClickDown,
  callFloor,
}: {
  floorNumber: number;
  isElevatorPresent: boolean;
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
          icon="ArrowUp"
          aria-label="Up"
          aria-pressed={isUp}
          onClick={!isElevatorPresent && !isUp ? onClickUp : undefined}
        />
        <IconButton
          icon="ArrowDown"
          aria-label="Down"
          aria-pressed={isDown}
          onClick={!isElevatorPresent && !isDown ? onClickDown : undefined}
        />
      </div>
      <button
        className={classNames("floor-elevator", {
          "call-signal": isCalled,
          active: !isCalled && !isElevatorPresent,
          elevator: isElevatorPresent,
        })}
        onClick={!isElevatorPresent ? () => callFloor(floorNumber) : undefined}
        aria-label={`floor ${floorNumber}`}>
        {floorNumber}
      </button>
    </div>
  );
};
