import * as yup from "yup";



export const validationSchemaLogin = yup.object({
  email: yup.string().email('Invalid Email Address').required("Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    // სხვა რაღაცებით ვალიდაციის შემდეგ API იძლეოდა Bad request-ს, სრულიად ამოუცნობი რამე
    .required("Required"),
});

