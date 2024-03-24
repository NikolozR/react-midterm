import React, { useContext, useCallback, useEffect, useState } from "react";
import { validationSchema } from "../service/validation/validationSchema";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../service/validation/useYupValidationResolver";
import { useQueryClient } from "react-query";
import UserContext from "../contexts/userContext";
import usePostUsers from "../service/Users/usePostUsers";

  


function Register() {
  // Declaration of variables and states
  const queryClient = useQueryClient();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
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
    resolver: useYupValidationResolver(validationSchema),
  });

  // checking for refresh, if user already signed in
  useEffect(() => {
    const res = sessionStorage.getItem("user");
    if (res) {
      setUser(JSON.parse(res));
    }
    setLoading(false);
  }, []);

  // if loading, nothing to show, otherwise login form is back
  return loading ? (
    <></>
  ) : (
    <div className="container">
      <h1>Log in to Gooners</h1>
      <p>Enter your details below</p>
      <form
        action=""
        onSubmit={handleSubmit(async (data) => {
          setUser(await createUser(data));
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
        
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
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
