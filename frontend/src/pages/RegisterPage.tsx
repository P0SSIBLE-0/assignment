import {useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {  RegisterFormInputs, RegisterResponse, registerSchema } from "../schemas/authSchema";
import { z } from "zod";
import { useMutation } from '@tanstack/react-query';
import {  useNavigate } from 'react-router-dom';
import { useState } from "react";
import { isApiError, registerUser } from "../utils/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  type TSignUpSchema = z.infer<typeof registerSchema>;
  const mutation = useMutation<RegisterResponse, unknown, RegisterFormInputs>({
    mutationFn: registerUser,

    onSuccess: (data) => {
      reset();
      console.log('Registration successful:', data);
      setApiErrorMessage(null); 
      alert(data.message || 'Registration successful! Please login.');
      navigate('/login'); // Redirect to login page after successful registration
    },

    onError: (error: any) => {
      console.error('Registration failed:', error );
      let message = error.message || 'An unexpected error occurred during registration.';
      if (isApiError(error)) {
        // Use the message from the backend response if available
        message = error.response?.data?.message || 'Registration failed. Please try again.';
      }
      setApiErrorMessage(message); // Set the API error message to display in the UI
    },

  });
  const onSubmit = (data: TSignUpSchema) => {
    console.log(data);
    // sending to the server here
    setApiErrorMessage(null);
    mutation.mutate(data);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Register</h2>
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
        </div>
        <div className="w-full">
          <Input
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            type="password"
          />
          {errors?.confirmPassword && (
            <p className="error">{errors.confirmPassword.message as string}</p>
          )}
          {
            apiErrorMessage && (
              <p className="error">{apiErrorMessage}</p>
            )
          }
        </div>
        <div className="w-full">
          <Button type="submit"  text="Register" isDisabled={isSubmitting} />
          <p className="text-center">
            already have an account? <a href="/login">login</a>
          </p>
        </div>
      </form>
    </div>
  );
}
