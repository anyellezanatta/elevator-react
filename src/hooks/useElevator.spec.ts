import { renderHook, act } from "@testing-library/react-hooks";
import { useElevator } from "./useElevator";

describe("useElevator", () => {
  // beforeEach(() => {
  //   jest.useFakeTimers();
  //   jest.spyOn(global, "setTimeout");
  // });

  it("should go to the first floor", async () => {
    const { result, waitForValueToChange } = renderHook(() => useElevator(2, 0, 50));

    act(() => {
      result.current.callFloor(1);
    });

    await waitForValueToChange(() => result.current.step.floor);

    expect(result.current.step.floor).toBe(1);
  });

  it("should go to the last floor", async () => {
    const expected = 5;

    const { result, waitForNextUpdate } = renderHook(() => useElevator(6, 0, 50));

    await act(async () => {
      result.current.callFloor(expected);

      do {
        await waitForNextUpdate();
      } while (result.current.step.floor !== expected);
    });

    expect(result.current.step.floor).toBe(5);
  });
});
