import { screen } from "@testing-library/react";
import { setup } from "../../../test-setup/test-utils";
import { Floor, FloorProps } from "./Floor";
import userEvent from "@testing-library/user-event";

describe("Floor", () => {
  const renderFloor = (floorProps: FloorProps) => {
    setup(<Floor {...floorProps} />);
  };

  it("should render with the buttons", () => {
    renderFloor({ floorNumber: 1 });

    const items = screen.getAllByRole("button");

    expect(items).toHaveLength(3);
  });

  it("should not click when the floor was called or elevator is present", () => {
    let clicked = false;
    renderFloor({
      floorNumber: 1,
      callFloor: () => {
        clicked = true;
      },
      onClickDown: () => {
        clicked = true;
      },
      onClickUp: () => {
        clicked = true;
      },
    });

    screen.getAllByRole("button").forEach(async (element) => {
      await userEvent.click(element);
    });

    expect(clicked).toBe(false);
  });

  it("should render the button floor with the classes elevator, call-signal", () => {
    renderFloor({ floorNumber: 1, isCalled: true, isDown: true, isElevatorPresent: true });

    const item = screen.getByRole("button", { name: "floor 1" });

    expect(item).toHaveClass("floor-elevator call-signal elevator");
  });

  it("should render the button floor with the classe active", () => {
    renderFloor({ floorNumber: 1, isCalled: false, isElevatorPresent: false });

    const item = screen.getByRole("button", { name: "floor 1" });

    expect(item).toHaveClass("floor-elevator active");
  });

  it("should render the button up floor with the aria-pressed", () => {
    renderFloor({ floorNumber: 1, isUp: true });

    const item = screen.getByRole("button", { name: "Up" });

    expect(item).toHaveAttribute("aria-pressed", "true");
  });

  it("should render the button down floor with the aria-pressed", () => {
    renderFloor({ floorNumber: 1, isDown: true });

    const item = screen.getByRole("button", { name: "Down" });

    expect(item).toHaveAttribute("aria-pressed", "true");
  });
});
