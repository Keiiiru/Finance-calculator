"use client";

import React, { FormEvent, useState } from "react";
import { registerAPI } from "../api/register";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
  email: string;
};

const AuthForm = () => {
  const [formToggler, setFormToggler] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Inputs>();

  function handleToggleForm() {
    setFormToggler((prev) => !prev);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => registerAPI(data);

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          {...register("username")}
        />

        {formToggler && (
          <>
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email"
              type="text"
              id="email"
              {...register("email")}
            />
          </>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          {...register("password")}
        />
        <button type="submit">{formToggler ? "Register" : "Auth"}</button>
      </form>
      <button onClick={handleToggleForm}>
        {formToggler ? "Login form" : "Register form"}
      </button>
    </div>
  );
};

export default AuthForm;
