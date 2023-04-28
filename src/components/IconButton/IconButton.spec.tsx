import { screen } from "@testing-library/react";
import { setup } from "../../../test-setup/test-utils";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  const renderButton = () => {
    setup(<IconButton icon="ArrowDown" />);
  };

  it("should render the button with the classes", () => {
    renderButton();

    const button = screen.getByRole("button");

    expect(button).toHaveClass("flex icon-button", { exact: true });
  });

  it("should render the button with the icon", () => {
    renderButton();

    const elements = screen.getByRole("button").getElementsByClassName("svg-icon");

    expect(elements).toHaveLength(1);
  });
});
