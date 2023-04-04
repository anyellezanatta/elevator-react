export const rangeUp = (size: number, start: number = 0) => {
  return [...Array(size).keys()].map((i) => i + start);
};

export const rangeDown = (size: number, start: number = 0) => {
  return [...Array(size).keys()].map((i) => start - i);
};

export const closest = (
  array: number[],
  target: number,
  fallback: number = 0,
) => {
  return array.reduceRight((closest, current) => {
    if (
      closest === undefined ||
      Math.abs(current - target) <= Math.abs(closest - target)
    ) {
      closest = current;
    }
    return closest;
  }, undefined as number | undefined);
};

export const ascending = (a: number, b: number) => a - b;

export const descending = (a: number, b: number) => b - a;
