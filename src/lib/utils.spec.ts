import { rangeDesc, removeBy, sortBy } from "./utils";

describe("utils", () => {
  describe("rangeDesc", () => {
    const cases = [
      { size: 0, start: 0, expected: [] },
      { size: 5, start: 4, expected: [8, 7, 6, 5, 4] },
      { size: 3, start: 3, expected: [5, 4, 3] },
    ];

    cases.forEach(({ size, start, expected }) => {
      it(`should generate the range ${expected} for the size ${size} starting at ${start}`, () => {
        // AAA
        const actual = rangeDesc(size, start);

        expect(actual).toStrictEqual(expected);
      });
    });
  });

  describe("removeBy", () => {
    it("should remove the item when it's found", () => {
      const expected = [{ size: 10 }, { size: 30 }];
      const items = [{ size: 10 }, { size: 20 }, { size: 30 }];

      const actual = removeBy(items, "size", 20);

      expect(actual).toStrictEqual(expected);
    });

    it("should not remove when the item is not found", () => {
      const items = [{ name: "Anna" }, { name: "Any" }];

      const actual = removeBy(items, "name", "Peter");

      expect(actual).toStrictEqual(items);
    });
  });

  describe("sortBy", () => {
    it("should sort the item ascending", () => {
      const expected = [{ age: 10 }, { age: 12 }, { age: 12 }, { age: 15 }];
      const items = [{ age: 12 }, { age: 15 }, { age: 10 }, { age: 12 }];

      const actual = sortBy(items, "age", "ascending");

      expect(actual).toStrictEqual(expected);
    });

    it("should sort the item descending", () => {
      const expected = [{ age: 28 }, { age: 26 }, { age: 23 }];
      const items = [{ age: 26 }, { age: 28 }, { age: 23 }];

      const actual = sortBy(items, "age", "descending");

      expect(actual).toStrictEqual(expected);
    });
  });
});
