import {z} from "zod";

export const loginSchema = z.object({
  email: z.string().email(
    {message: "email is required"}
  ),
  password: z.string().min(6, {message: "Password must be at least 6 characters long"})
})  

export type TLoginFormInputs = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email({message: "email is required"}),
  password: z.string().min(6, {message: "Password must be at least 6 characters long"}),
  confirmPassword: z.string().min(6, {message: "Password must be at least 6 characters long"})
}).refine((data) => data.password === data.confirmPassword, {message: "Passwords do not match", path: ["confirmPassword"]})

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export interface RegisterResponse {
  message: string;
  user?: {
    email: string;
  }; 
}

// Expected error structure from your backend API
export interface ApiErrorData {
  error: string;
  message: string;
  statusCode?: number;
  // any other fields your backend error handler sends
}