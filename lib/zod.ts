import {object, string} from "zod"

export const SignInSchema = object({
  email: string().email("Invalid email "),
  password: string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be less than 32 characters"),
})

export const registerSchema = object({
  name: string().min(1, "Name must be at least 1 character long"),
  email: string().email("Invalid email "),
  password: string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be less than 32 characters"),
    confirmPassword: string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match", 
  path: ["confirmPassword"],
})