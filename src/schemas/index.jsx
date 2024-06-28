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
  bannerImage: Yup.string().required("Banner Image  is required"),

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
  specialUsers: Yup.array()
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
  discountStartDate: Yup.string().when(
    "discountType",
    (discountType, schema) => {
      if (parseInt(discountType[0]) === 2) {
        return schema.required("Discount Start Date is required");
      } else {
        return Yup.string().nullable();
      }
    }
  ),
  discountEndDate: Yup.string().when("discountType", (discountType, schema) => {
    if (parseInt(discountType[0]) === 2) {
      return schema.required("Discount End Date is required");
    } else {
      return Yup.string().nullable();
    }
  }),
});
