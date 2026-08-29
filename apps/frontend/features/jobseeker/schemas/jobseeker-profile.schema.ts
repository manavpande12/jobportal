import { z } from "zod";

export const PROFILE_LIMITS = {
    FIRST_NAME: { MIN: 2, MAX: 15 },
    LAST_NAME: { MIN: 2, MAX: 15 },
    HEADLINE: { MIN: 10, MAX: 100 },
    ABOUT_ME: { MIN: 255, MAX: 1000 },
    SKILLS: { MIN: 3, MAX: 20 },
    YEARS_OF_EXPERIENCE: { MIN: 0, MAX: 50 },
} as const;

/* -------------------------------------------------------------------------- */
/*                                BASIC INFO                                  */
/* -------------------------------------------------------------------------- */

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

export type BasicInformationFormData =
    z.infer<typeof basicInformationSchema>;

/* -------------------------------------------------------------------------- */
/*                           PROFESSIONAL DETAILS                             */
/* -------------------------------------------------------------------------- */

export const professionalDetailsSchema = z.object({
    yearsOfExperience: z
        .number({
            error: "Experience must be a number and not empty.",
        })
        .min(
            PROFILE_LIMITS.YEARS_OF_EXPERIENCE.MIN,
            `Years of experience cannot be negative`
        )
        .max(
            PROFILE_LIMITS.YEARS_OF_EXPERIENCE.MAX,
            `Years of experience must be ${PROFILE_LIMITS.YEARS_OF_EXPERIENCE.MIN} - ${PROFILE_LIMITS.YEARS_OF_EXPERIENCE.MAX}`
        ),

    headline: z
        .string({ error: "Headline must not be empty." })
        .min(
            PROFILE_LIMITS.HEADLINE.MIN,
            `Headline must at least ${PROFILE_LIMITS.HEADLINE.MIN} chars`
        )
        .max(
            PROFILE_LIMITS.HEADLINE.MAX,
            `Headline must not exceed ${PROFILE_LIMITS.HEADLINE.MAX} chars`
        ),
});

export type ProfessionalDetailsFormData =
    z.infer<typeof professionalDetailsSchema>;


/* -------------------------------------------------------------------------- */
/*                           RESUME DETAILS                             */
/* -------------------------------------------------------------------------- */

export const resumeSchema = z.object({
    resumeUrl: z
        .string().trim()
        .optional(),
});

export type ResumeFormData =
    z.infer<typeof resumeSchema>;

/* -------------------------------------------------------------------------- */
/*                                  ABOUT ME                                  */
/* -------------------------------------------------------------------------- */

export const aboutMeSchema = z.object({
    aboutMe: z
        .string().trim()
        .min(
            PROFILE_LIMITS.ABOUT_ME.MIN,
            `About me must at least ${PROFILE_LIMITS.ABOUT_ME.MIN} chars`
        )
        .max(
            PROFILE_LIMITS.ABOUT_ME.MAX,
            `About me must not exceed ${PROFILE_LIMITS.ABOUT_ME.MAX} chars`
        ),
});

export type AboutMeFormData =
    z.infer<typeof aboutMeSchema>;

/* -------------------------------------------------------------------------- */
/*                                   SKILLS                                   */
/* -------------------------------------------------------------------------- */

export const skillsSchema = z.object({
    skills: z
        .array(z.number())
        .min(
            PROFILE_LIMITS.SKILLS.MIN,
            `Add at least ${PROFILE_LIMITS.SKILLS.MIN} skills`
        )
        .max(
            PROFILE_LIMITS.SKILLS.MAX,
            `Cannot add more than ${PROFILE_LIMITS.SKILLS.MAX} skills`
        ),
});

export type SkillsFormData =
    z.infer<typeof skillsSchema>;

/* -------------------------------------------------------------------------- */
/*                              COMBINED SCHEMA                               */
/* -------------------------------------------------------------------------- */
