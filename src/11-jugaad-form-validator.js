/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Errors object
  const errors = {};

  /*
    1. NAME VALIDATION
  */

  const name = formData?.name;

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 50
  ) {
    errors.name =
      "Name must be 2-50 characters";
  }

  /*
    2. EMAIL VALIDATION
  */

  const email = formData?.email;

  if (typeof email !== "string") {

    errors.email =
      "Invalid email format";

  } else {

    const atIndex = email.indexOf("@");

    const lastAtIndex =
      email.lastIndexOf("@");

    const dotIndex =
      email.indexOf(".", atIndex);

    // Exactly one @
    const oneAt =
      atIndex !== -1 &&
      atIndex === lastAtIndex;

    // Dot after @
    const hasDotAfterAt =
      dotIndex > atIndex;

    if (!oneAt || !hasDotAfterAt) {

      errors.email =
        "Invalid email format";
    }
  }

  /*
    3. PHONE VALIDATION
  */

  const phone = formData?.phone;

  let validPhone = true;

  if (
    typeof phone !== "string" ||
    phone.length !== 10
  ) {

    validPhone = false;

  } else {

    // First digit check
    if (
      !["6", "7", "8", "9"]
        .includes(phone[0])
    ) {

      validPhone = false;
    }

    // Check every char digit
    for (const char of phone) {

      if (
        char < "0" ||
        char > "9"
      ) {

        validPhone = false;
        break;
      }
    }
  }

  if (!validPhone) {

    errors.phone =
      "Invalid Indian phone number";
  }

  /*
    4. AGE VALIDATION
  */

  let age = formData?.age;

  // Convert string number
  if (typeof age === "string") {

    age = parseInt(age);
  }

  if (
    isNaN(age) ||
    !Number.isInteger(age) ||
    age < 16 ||
    age > 100
  ) {

    errors.age =
      "Age must be an integer between 16 and 100";
  }

  /*
    5. PINCODE VALIDATION
  */

  const pincode =
    formData?.pincode;

  let validPincode = true;

  if (
    typeof pincode !== "string" ||
    pincode.length !== 6 ||
    pincode.startsWith("0")
  ) {

    validPincode = false;

  } else {

    // Digit check
    for (const char of pincode) {

      if (
        char < "0" ||
        char > "9"
      ) {

        validPincode = false;
        break;
      }
    }
  }

  if (!validPincode) {

    errors.pincode =
      "Invalid Indian pincode";
  }

  /*
    6. STATE VALIDATION
  */

  const state =
    formData?.state ?? "";

  if (
    typeof state !== "string" ||
    state.trim() === ""
  ) {

    errors.state =
      "State is required";
  }

  /*
    7. TERMS VALIDATION
  */

  if (
    Boolean(formData?.agreeTerms)
    !== true
  ) {

    errors.agreeTerms =
      "Must agree to terms";
  }

  /*
    FINAL RESULT
  */

  return {
    isValid:
      Object.keys(errors).length === 0,

    errors
  };
}
