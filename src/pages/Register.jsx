import React, { useContext, useCallback, useEffect, useState } from "react";
import { validationSchemaRegister } from "../service/validation/validationSchemaRegister";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../service/validation/useYupValidationResolver";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import usePostUsers from "../service/Users/usePostUsers";
import '../styles/Login.scss'

function Register() {
  const queryClient = useQueryClient();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { createUser } = usePostUsers(queryClient);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "https://picsum.photos/800",
    },
    resolver: useYupValidationResolver(validationSchemaRegister),
  });

  useEffect(() => {
    const res = sessionStorage.getItem("user");
    if (res) {
      setUser(JSON.parse(res));
    } else {
      navigate("/register");
    }
    setLoading(false);
  }, []);

  return loading ? (
    <></>
  ) : (
    <main>
      <div className="container">
        <h1>Become A Gooner</h1>
        <form
          noValidate
          action=""
          onSubmit={handleSubmit(async (data) => {
            const user = await createUser(data);
            setUser(user);
            navigate(`/customer/products`);
          })}
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your username"
            {...register("name")}
          />
          {errors?.name && <span className="error">{errors?.name?.message}</span>}
          <input type="email" placeholder="Your email" {...register("email")} />
          {errors?.email && <span className="error">{errors?.email.message}</span>}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors?.password && <span className="error">{errors?.password.message}</span>}
          <input
            disabled
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            {...register("avatar")}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}

export default Register;
