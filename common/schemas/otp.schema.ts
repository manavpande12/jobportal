import { z } from "zod";

export const verifyOtpSchema = z.object({
    otp: z
        .string()
        .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export type VerifyFormData = z.infer<typeof verifyOtpSchema>;

export const sendOtpSchema = z.object({
    email: z.email("Invalid email address"),
});

export type SendFormData = z.infer<typeof sendOtpSchema>;