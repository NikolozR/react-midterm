import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../service/validation/useYupValidationResolver";
import useGetProfile from "../service/Authentication/useGetProfile";
import { useQueryClient } from "react-query";
import useToken from "../service/Authentication/useToken";

const validationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "john@mail.com",
      password: "changeme",
    },
    resolver: useYupValidationResolver(validationSchema),
  });

  const queryClient = useQueryClient();
  const {getToken} = useToken(queryClient)
  const { getProfile } = useGetProfile(queryClient)
   
  const onSubmit = async (data) => {
    const tokens = await getToken(data);
    if (tokens && tokens.access_token) {
      await getProfile(tokens.access_token);
    }
  };
 
  return (
    <div className="container">
      <h1>Log in to Gooners</h1>
      <p>Enter your details below</p>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="email" placeholder="Your email" {...register("email")} />
        <input type="password" placeholder="Password" {...register("password")} />

        <button type="submit">Sumit</button>
      </form>
    </div>
  );
}

export default Login;
