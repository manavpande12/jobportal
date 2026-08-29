import { z } from "zod";

export const REGISTER_LIMITS = {
    FIRST_NAME: { MIN: 2, MAX: 15 },
    LAST_NAME: { MIN: 2, MAX: 15 },
    PASSWORD: { MIN: 8, MAX: 100 },

} as const;

export const registerSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(REGISTER_LIMITS.FIRST_NAME.MIN, `First name must be at least ${REGISTER_LIMITS.FIRST_NAME.MIN} chars`)
            .max(REGISTER_LIMITS.FIRST_NAME.MAX, `First name cannot exceed ${REGISTER_LIMITS.FIRST_NAME.MAX} chars`),
        lastName: z
            .string()
            .trim()
            .min(REGISTER_LIMITS.LAST_NAME.MIN, `Last name must be at least ${REGISTER_LIMITS.LAST_NAME.MIN} characters`)
            .max(REGISTER_LIMITS.LAST_NAME.MAX, `Last name cannot exceed ${REGISTER_LIMITS.LAST_NAME.MAX} chars`),
        password: z
            .string()
            .min(REGISTER_LIMITS.PASSWORD.MIN, `Password must be at least ${REGISTER_LIMITS.PASSWORD.MAX} chars`)
            .max(REGISTER_LIMITS.PASSWORD.MAX, `Password cannot exceed ${REGISTER_LIMITS.PASSWORD.MAX} chars`)
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
        confirmPassword: z.string(),
    })

    .refine(
        (data) =>
            data.password === data.confirmPassword,

        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

export type RegisterFormData =
    z.infer<typeof registerSchema>;