import * as yup from "yup";

export const validationSchemaLogin = yup.object({
  email: yup.string().email("Invalid Email Address").required("Required"),
  password: yup
    .string()
    // .min(8, "Password must be at least 8 characters") (removed this because admin user has password below 8 letters)
    // with other validations methods the API returns BAD REQUEST, no idea why
    .required("Required"),
});
