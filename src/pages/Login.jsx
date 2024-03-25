import React, { useContext, useEffect, useState } from "react";
import { validationSchemaLogin } from "../service/validation/validationSchemaLogin";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../service/validation/useYupValidationResolver";
import useGetProfile from "../service/Authentication/useGetProfile";
import { useQueryClient } from "react-query";
import useToken from "../service/Authentication/useToken";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import "../styles/Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function Login() {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getToken, isLoading: tokenLoading } = useToken(queryClient);
  const { getProfile, isLoading: profileLoading } = useGetProfile(queryClient);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: useYupValidationResolver(validationSchemaLogin),
  });
  useEffect(() => {
    const res = sessionStorage.getItem("user");
    if (res) {
      setUser(JSON.parse(res));
    } else {
      navigate("/");
    }
    setLoading(false);
  }, []);

  return loading ? (
    <></>
  ) : (
    <main>
      <div className="container">
        <h1>Log in to Gooners</h1>
        <form
          noValidate
          action=""
          onSubmit={handleSubmit(async (data) => {
            try {
              const tokens = await getToken(data);
              if (tokens && tokens.access_token) {
                const res = await getProfile(tokens.access_token);
                setUser(res);
                navigate(`/${res?.role}/products`);
              }
            } catch (err) {
              alert("Not logged in");
            }
          })}
        >
          <input type="email" placeholder="Your email" {...register("email")} />
          {errors?.email && (
            <span className="error">{errors?.email?.message}</span>
          )}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
            <div
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
            </div>
          </div>
          {errors?.password && (
            <span className="error">{errors?.password?.message}</span>
          )}
          <button className="submit-btn" disabled={tokenLoading || profileLoading} type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
