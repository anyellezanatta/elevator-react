import { it } from "node:test";
import { elevator, ElevatorType } from "./elevator";

describe("elevator", () => {
  let sut: ElevatorType;

  beforeEach(() => {
    sut = elevator();
  });

  describe("callUp", () => {
    it("should add floor calls with the direction of up", () => {
      sut.callUp(1);
      expect(sut.calls).toHaveLength(1);
    });
  });
});
