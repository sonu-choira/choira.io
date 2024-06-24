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
