import { z } from "zod";

export const PROFILE_LIMITS = {
    FIRST_NAME: { MIN: 2, MAX: 15 },
    LAST_NAME: { MIN: 2, MAX: 15 },
    DESIGNATION: { MIN: 10, MAX: 50 }
} as const;

export const basicInformationSchema = z.object({
    firstName: z
        .string().trim()
        .min(
            PROFILE_LIMITS.FIRST_NAME.MIN,
            `First name must be ${PROFILE_LIMITS.FIRST_NAME.MIN} - ${PROFILE_LIMITS.FIRST_NAME.MAX} chars`
        )
        .max(
            PROFILE_LIMITS.FIRST_NAME.MAX,
            `First name must be ${PROFILE_LIMITS.FIRST_NAME.MIN} - ${PROFILE_LIMITS.FIRST_NAME.MAX} chars`
        ),

    lastName: z
        .string().trim()
        .min(
            PROFILE_LIMITS.LAST_NAME.MIN,
            `Last name must be ${PROFILE_LIMITS.LAST_NAME.MIN} - ${PROFILE_LIMITS.LAST_NAME.MAX} chars`
        )
        .max(
            PROFILE_LIMITS.LAST_NAME.MAX,
            `Last name must be ${PROFILE_LIMITS.LAST_NAME.MIN} - ${PROFILE_LIMITS.LAST_NAME.MAX} chars`
        ),
});

export type BasicInformationFormData = z.infer<typeof basicInformationSchema>

export const professionalDetailsSchema = z.object({
    designation: z
        .string().trim()
        .min(
            PROFILE_LIMITS.DESIGNATION.MIN,
            `Designation must at least ${PROFILE_LIMITS.DESIGNATION.MIN} chars`
        )
        .max(
            PROFILE_LIMITS.DESIGNATION.MAX,
            `Designation must not exceed ${PROFILE_LIMITS.DESIGNATION.MAX} chars`
        ),
});

export type ProfessionalDetailsFormData =
    z.infer<typeof professionalDetailsSchema>;