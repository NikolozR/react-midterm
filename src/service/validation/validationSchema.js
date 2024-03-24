import * as yup from "yup";



export const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email('Invalid Email Address').required("Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Required"),
});

