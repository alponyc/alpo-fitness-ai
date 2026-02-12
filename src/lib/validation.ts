import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(30, "Phone too long").optional().or(z.literal("")),
  weight: z.string().trim().min(1, "Weight is required").max(10).refine(
    (v) => !isNaN(Number(v)) && Number(v) > 0 && Number(v) < 1000,
    "Weight must be a number between 0 and 1000"
  ),
  goal: z.enum(["lose", "gain", "maintain"], { required_error: "Goal is required" }),
  age: z.number().int().min(0).max(150).optional().or(z.nan().transform(() => undefined)),
  gender: z.enum(["Male", "Female", "Other"]).optional().or(z.literal("")),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]).optional().or(z.literal("")),
  accountType: z.enum(["user", "client", "family", "trainer"]).optional().or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const authSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().trim().min(1, "Name is required").max(100).optional(),
});

export type AuthFormData = z.infer<typeof authSchema>;
