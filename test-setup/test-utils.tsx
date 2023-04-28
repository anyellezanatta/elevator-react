import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

// setup function
export const setup = (jsx: ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};
