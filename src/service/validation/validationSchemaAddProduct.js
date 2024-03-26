import * as yup from "yup";

export const validationSchemaAddProduct = yup.object({
  title: yup.string().required("Required"),
  price: yup.number().typeError('Price must be a number').required("Required"),
  description: yup.string().required("Required"),
  categoryId: yup.string().required("Required"),
});
