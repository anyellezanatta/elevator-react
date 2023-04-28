import { MouseEventHandler } from "react";
import classNames from "classnames";
import { IconButton } from "@/components/IconButton";
import "./floor.css";

export type FloorProps = {
  floorNumber: number;
  isElevatorPresent?: boolean;
  isCalled?: boolean;
  isUp?: boolean;
  isDown?: boolean;
  onClickUp?: () => void;
  onClickDown?: () => void;
  callFloor?: (floor: number) => void;
};

export const Floor = ({
  floorNumber,
  isElevatorPresent,
  isCalled,
  isUp,
  isDown,
  onClickUp,
  onClickDown,
  callFloor,
}: FloorProps) => {
  const handleCallFloorClick = () => {
    if (!isElevatorPresent && callFloor) callFloor(floorNumber);
  };

  const handleCallDownClick = () => {
    if (!isElevatorPresent && !isDown && onClickDown) onClickDown();
  };

  const handleCallUpClick = () => {
    if (!isElevatorPresent && !isUp && onClickUp) onClickUp();
  };

  return (
    <div className="flex floor">
      <div className="flex direction-buttons">
        <IconButton
          icon="ArrowUp"
          aria-label="Up"
          aria-pressed={isUp}
          onClick={handleCallUpClick}
        />
        <IconButton
          icon="ArrowDown"
          aria-label="Down"
          aria-pressed={isDown}
          onClick={handleCallDownClick}
        />
      </div>
      <button
        className={classNames("floor-elevator", {
          "call-signal": isCalled,
          active: !isCalled && !isElevatorPresent,
          elevator: isElevatorPresent,
        })}
        onClick={handleCallFloorClick}
        aria-label={`floor ${floorNumber}`}>
        {floorNumber}
      </button>
    </div>
  );
};
