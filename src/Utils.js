export const sumArrayItems = arr => {
  if (arr.length) {
    return arr.reduce((prev, curr) => prev + curr);
  }
  return 0;
};
