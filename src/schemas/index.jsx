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
  phone: Yup.string()
    .required("Mobile is required")
    .min(10, "Mobile number should be at least  10 digit ")
    .max(12, "Mobile number should be at most  12 digit "),
  dob: Yup.string().required("Date of birth is required"),
});

export const bannerSchema = Yup.object().shape({
  banner_redirect: Yup.string()
    .required("Redirect type is required")
    .oneOf(["external", "in-app"], "Invalid redirect type"),
  photoURL: Yup.string().required("Banner Image  is required"),
  name: Yup.string().required("Banner Name  is required"),
  active: Yup.number()
    .required("Status   is required")
    .transform((value, originalValue) => {
      return Number(originalValue);
    }),
  stage: Yup.number()
    .required("Stage   is required")
    .transform((value, originalValue) => {
      return Number(originalValue);
    }),

  redirectURL: Yup.string().when(
    "banner_redirect",
    (banner_redirect, schema) => {
      if (banner_redirect[0] === "external") {
        return schema
          .required("Redirect URL is required")
          .url("Invalid external URL")
          .min(2, "Too Short!");
      } else {
        return Yup.string().nullable();
      }
    }
  ),

  // bannerType: Yup.string().when(
  //   "banner_redirect",
  //   (banner_redirect, schema) => {
  //     if (banner_redirect[0] === "in-app") {
  //       return schema.required("Banner type is required");
  //     } else {
  //       return Yup.string().nullable();
  //     }
  //   }
  // ),

  forr: Yup.string().when("banner_redirect", (banner_redirect, schema) => {
    if (banner_redirect[0] === "in-app") {
      return schema.required("Particular Studio   is required");
    } else {
      return Yup.string().nullable();
    }
  }),

  entity_id: Yup.string().when(["banner_redirect", "forr"], (Arr, schema) => {
    // console.log(Arr, "forr");

    if (Arr[0] === "in-app" && Arr[1] === "page") {
      return schema.required(
        "Studio name is required for specific destinations"
      );
    } else {
      return Yup.string().nullable();
    }
  }),
});

export const DiscountSchema = Yup.object().shape({
  discountName: Yup.string().required("Discount Name is required"),
  discountPercentage: Yup.number()
    .required("Discount Percentage is required")
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage must be at most 100"),
  couponCode: Yup.string().required("Coupon Code is required"),
  discountType: Yup.number().required("Discount Type is required"),
  maxCapAmount: Yup.number()
    .required("Max Cap Amount is required")
    .min(0, "Amount must be at least 0"),
  description: Yup.string().required("Description is required"),
  usersList: Yup.array()
    .of(Yup.string())
    .when("discountType", (discountType, schema) => {
      // console.log("discountType=========>", discountType);
      if (parseInt(discountType[0]) === 4) {
        return schema.required("Special Users is required");
      } else {
        return Yup.array().nullable();
      }
    }),
  // discountDate: Yup.array()
  //   .of(Yup.string())
  //   .when("discountType", (discountType, schema) => {
  //     if (parseInt(discountType[0]) === 2) {
  //       return schema.required("Discount Date is required");
  //     } else {
  //       return Yup.array().nullable();
  //     }
  //   }),
  startDate: Yup.string().when("discountType", (discountType, schema) => {
    if (parseInt(discountType[0]) === 2) {
      return schema.required("Discount Start Date is required");
    } else {
      return Yup.string().nullable();
    }
  }),
  endDate: Yup.string().when("discountType", (discountType, schema) => {
    if (parseInt(discountType[0]) === 2) {
      return schema.required("Discount End Date is required");
    } else {
      return Yup.string().nullable();
    }
  }),
});
