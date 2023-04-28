import { screen } from "@testing-library/react";
import { setup } from "../../../test-setup/test-utils";
import { Building } from "./Building";

describe("Building", () => {
  const renderBuilding = () => {
    setup(<Building />);
  };

  it("should render with the class", () => {
    renderBuilding();

    const items = screen.getAllByRole("button", { name: "Up" });

    expect(items).toHaveLength(6);
  });
});
