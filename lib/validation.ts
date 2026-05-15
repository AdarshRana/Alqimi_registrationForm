import { z } from "zod";

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .regex(/^[A-Za-z ]+$/, "First name can contain only letters"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .regex(/^[A-Za-z ]+$/, "Last name can contain only letters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    phone: z
        .string()
        .trim()
        .min(1, "Phone number is required")
        .regex(
            /^\+\d{1,4}\s?[1-9]\d{6,14}$/,
            "Please enter a valid phone number with country code (e.g. +91 9876543210)"
        ),

    position: z.string().optional(),

    organization: z
      .string()
      .trim()
      .min(1, "Organization is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;