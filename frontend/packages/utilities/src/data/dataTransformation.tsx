export const transformData = <T, R>(debug: boolean, transformator: (data: T) => R, data: T): R => {
  if (debug) {
    console.log("Original Data:", data);
  }

  const transformedData = transformator(data);

  if (debug) {
    console.log("Transformed Data:", transformedData);
  }

  return transformedData;
};
