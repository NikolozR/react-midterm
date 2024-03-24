import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../service/validation/useYupValidationResolver";
import useGetProfile from "../service/Authentication/useGetProfile";
import { useQueryClient } from "react-query";
import useToken from "../service/Authentication/useToken";
import UserContext from "../contexts/userContext";

const validationSchema = yup.object({
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

function Login() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "john@mail.com",
      password: "changeme",
    },
    resolver: useYupValidationResolver(validationSchema),
  });
  const queryClient = useQueryClient();
  const { getToken, isLoading: tokenLoading } = useToken(queryClient);
  const { getProfile, isLoading: profileLoading } = useGetProfile(queryClient);
  const onSubmit = async (data) => {
    const tokens = await getToken(data);
    if (tokens && tokens.access_token) {
      const res = await getProfile(tokens.access_token);
      setUser(res);
    }
  };
  useEffect(() => {
    const res = sessionStorage.getItem("user");
    if (res) {
      setUser(JSON.parse(res));
    }
    setLoading(false);
  }, []);

  return loading ? (
    <></>
  ) : (
    <div className="container">
      <h1>Log in to Gooners</h1>
      <p>Enter your details below</p>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Your email" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <button disabled={tokenLoading || profileLoading} type="submit">
          Sumit
        </button>
      </form>
    </div>
  );
}

export default Login;
