import { endAt } from "firebase/database";

export const clearEmptyField = (data) => {
  // This function clears empty fields from the object
  Object.keys(data).forEach((key) => {
    if (data[key] === "" || data[key] === undefined) {
      delete data[key];
    }
  });
}

export  const validateEmptyField = (checkData) => {
  let hasError = false;
  const errorFields = [];

  const errorAlert = (message) => {
    // Placeholder for your error alert function
    console.error(message); 
  };

  const isEmpty = (value) => {
    return (
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null &&
        Object.keys(value).length === 0)
    );
  };

  const check = (data) => {
    for (const key of Object.keys(data)) {
      const value = data[key];

      if (isEmpty(value)) {
        errorAlert(`${key} field is empty`);
        hasError = true; // Set hasError to true if an empty field is found
        errorFields.push(key); // Collect the field name with error
        return; // Exit on first empty field
      }

      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        if (check(value)) hasError = true; // Recursively check nested objects
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === "object" && item !== null) {
            if (check(item)) hasError = true; // Recursively check items in arrays
          }
        }
      }
    }
    return hasError;
  };

  check(checkData);
  return { hasError, errorFields };
};

// ============usage ==============
// const result = checkEmptyFields(checkData);
//         let hasError = result.hasError;
//         console.log(`Has error: ${result.hasError}`);

//         if (hasError == true)
//           return errorAlert(`Empty fields: ${result.errorFields.join(", ")}`);

// ====================end=====================