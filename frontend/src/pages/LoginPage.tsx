import {useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, RegisterResponse, TLoginFormInputs } from "../schemas/authSchema";

import { useMutation } from '@tanstack/react-query';
import { useState } from "react";
import { isApiError, loginUser } from "../utils/api";

export default function LoginPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation<RegisterResponse, unknown, TLoginFormInputs>({
    mutationFn: loginUser,

    onSuccess: (data) => {
      reset();
      setAuthenticated(true);
      console.log('Registration successful:', data);
      setApiErrorMessage(null);
      alert(data.message || 'Login successful! Please login.');
    },
    onError: (error: any) => {
      console.error('Registration failed:', error);
      let message = error.message || 'An unexpected error occurred during registration.';
      if (isApiError(error)) {
        // Use the message from the backend response if available
        message = error.response?.data?.message || 'Registration failed. Please try again.';
      }
      setApiErrorMessage(message);
    }
  })
  const onSubmit = (data: TLoginFormInputs) => {
    console.log(data);
    // sending to the server here
    mutation.mutate(data);
  };
  if (authenticated) {
    return <div className="form-container">
      <h1>You are logged in</h1>
    </div>;
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Welcome Back!</h2>
        <div className="w-full">
          <Input
            {...register("email")}
            placeholder="Email"
            type="email"
          />
          {errors?.email && (
            <p className="error">{errors.email.message as string}</p>
          )}
        </div>

        <div className="w-full">
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          {errors?.password && (
            <p className="error">{errors.password.message as string}</p>
          )}
          {
            apiErrorMessage && <p className="error">{apiErrorMessage}</p>
          }
        </div>
        <div className="w-full">
          <Button type="submit"  text="Register" isDisabled={isSubmitting} />
          <p className="text-center">
            already have an account? <a href="/register">register</a>
          </p>
        </div>
      </form>
    </div>
  );
}
