import React, { useContext, useCallback, useEffect, useState } from "react";
import { validationSchemaRegister } from "../service/validation/validationSchemaRegister";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../service/validation/useYupValidationResolver";
import { useQueryClient } from "react-query";
import {useNavigate } from 'react-router-dom'
import UserContext from "../contexts/userContext";
import usePostUsers from "../service/Users/usePostUsers";

function Register() {
  const queryClient = useQueryClient();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { createUser } = usePostUsers(queryClient);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "nikaTest1",
      email: "test1@gmail.com",
      password: "1234",
      avatar: "https://picsum.photos/800",
    },
    resolver: useYupValidationResolver(validationSchemaRegister),
  });

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
        noValidate
        action=""
        onSubmit={handleSubmit(async (data) => {
          const user = await createUser(data) 
          setUser(user);
          navigate(`/customer/products`)
        })}
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your username"
          {...register("name")}
        />
        <input type="email" placeholder="Your email" {...register("email")} />
        {errors?.email && <span>{errors?.email.message}</span>}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          />
          {errors?.password && <span>{errors?.password.message}</span>}
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
  );
}

export default Register;
