import * as yup from "yup";

export const validationSchemaRegister = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid Email Address").required("Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    // with other validations methods the API returns BAD REQUEST, no idea why
    .required("Required"),
});
