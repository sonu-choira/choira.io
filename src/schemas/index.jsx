import * as Yup from "yup";

export const armSchema = Yup.object().shape({
  userName: Yup.string().required("Full Name is required").min(4, "Too Short!"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  permission: Yup.array().of(Yup.string()).min(1, "Permission is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "password too short"),
  mobile: Yup.number()
    .typeError("Mobile number must be a number")
    .required("Mobile is required")
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    ),
});

export const studioPartner = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(4, "Too Short!"),
  lastName: Yup.string().required("Last Name is required").min(4, "Too Short!"),
  studioId: Yup.string().required("Studio id is required").min(4, "Too Short!"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "password too short"),
});

export const bannerSchema = Yup.object().shape({
  redirectType: Yup.string()
    .required("Redirect type is required")
    .oneOf(["External", "in-App"], "Invalid redirect type"),

  redirectUrl: Yup.string().when("redirectType", (redirectType, schema) => {
    if (redirectType[0] === "External") {
      return schema
        .required("Redirect URL is required")
        .url("Invalid external URL")
        .min(2, "Too Short!");
    } else {
      return Yup.string().nullable();
    }
  }),

  bannerType: Yup.string().when("redirectType", (redirectType, schema) => {
    if (redirectType[0] === "in-App") {
      return schema.required("Banner type is required");
    } else {
      return Yup.string().nullable();
    }
  }),

  specify: Yup.string().when("redirectType", (redirectType, schema) => {
    if (redirectType[0] === "in-App") {
      return schema.required("Specify destination is required");
    } else {
      return Yup.string().nullable();
    }
  }),

  studioId: Yup.string().when(["redirectType", "specify"], (Arr, schema) => {
    console.log(Arr, "specify");

    if (Arr[0] === "in-App" && Arr[1] === "Particular") {
      return schema.required(
        "Studio name is required for specific destinations"
      );
    } else {
      return Yup.string().nullable();
    }
  }),
});
// redirectUrl: Yup.string().when("redirectType", {
//   is: "External",
//   then: Yup.string().required("Redirect URL is required").url("Invalid URL"),
//   otherwise: Yup.string().nullable(),
// bannerType: Yup.string().when("redirectType", {
//   is: "in-App",
//   then: Yup.string().required("Banner type is required"),
//   otherwise: Yup.string().nullable(),
// }),
// specify: Yup.string().when("redirectType", {
//   is: "in-App",
//   then: Yup.string().required("Specify is required"),
//   otherwise: Yup.string().nullable(),
// }),
// studioId: Yup.string().when(["redirectType", "specify"], {
//   is: (redirectType, specify) =>
//     redirectType === "in-App" && specify === "Particular",
//   then: Yup.string().required("Studio name is required"),
//   otherwise: Yup.string().nullable(),
// }),
