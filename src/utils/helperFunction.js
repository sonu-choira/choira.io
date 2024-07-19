export const clearEmptyField = (data) => {
  // This function clears empty fields from the object
  Object.keys(data).forEach((key) => {
    if (data[key] === "" || data[key] === undefined) {
      delete data[key];
    }
  });
}