import React, { useContext, useEffect, useState } from "react";
import { validationSchemaLogin } from "../service/validation/validationSchemaLogin";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../service/validation/useYupValidationResolver";
import useGetProfile from "../service/Authentication/useGetProfile";
import { useQueryClient } from "react-query";
import useToken from "../service/Authentication/useToken";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";

function Login() {
  const queryClient = useQueryClient();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { getToken, isLoading: tokenLoading } = useToken(queryClient);
  const { getProfile, isLoading: profileLoading } = useGetProfile(queryClient);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "john@mail.com",
      password: "changeme",
    },
    resolver: useYupValidationResolver(validationSchemaLogin),
  });
  console.log(errors);
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
      <form
        action=""
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          try {
            const tokens = await getToken(data);
            if (tokens && tokens.access_token) {
              const res = await getProfile(tokens.access_token);
              setUser(res);
              navigate(`/customer/products`)
            }
          } catch (err) {
            alert("Not logged in");
          }
        })}
      >
        <input type="email" placeholder="Your email" {...register("email")} />
        {errors?.email?.message}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors?.password?.message}
        <button disabled={tokenLoading || profileLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
