import * as yup from "yup";



export const validationSchemaRegister = yup.object({
  name: yup.string().required(),
  email: yup.string().email('Invalid Email Address').required("Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    
    .required("Required"),
});

