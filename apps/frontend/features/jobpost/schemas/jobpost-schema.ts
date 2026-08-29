import { getPlainText } from "@/common/utils/html";
import z from "zod";

export const JOBPOST_LIMITS = {
    TITLE: { MIN: 5, MAX: 80 },
    DESCRIPTION: { MIN: 100, MAX: 4000 },
    SKILLS: { MIN: 3, MAX: 20 },
} as const;



export const updateJobPostSchema = z.object({
    title: z
        .string().trim()
        .min(
            JOBPOST_LIMITS.TITLE.MIN,
            `Title must be ${JOBPOST_LIMITS.TITLE.MIN} - ${JOBPOST_LIMITS.TITLE.MAX} chars`
        )
        .max(
            JOBPOST_LIMITS.TITLE.MAX,
            `Title must be ${JOBPOST_LIMITS.TITLE.MIN} - ${JOBPOST_LIMITS.TITLE.MAX} chars`
        ),

    description: z
        .string().trim()
        .refine(
            (html) =>
                getPlainText(html).length >=
                JOBPOST_LIMITS.DESCRIPTION.MIN,
            {
                message: `Description must be ${JOBPOST_LIMITS.DESCRIPTION.MIN} - ${JOBPOST_LIMITS.DESCRIPTION.MAX} chars`,
            }
        )
        .refine(
            (html) =>
                getPlainText(html).length <=
                JOBPOST_LIMITS.DESCRIPTION.MAX,
            {
                message: `Description must be ${JOBPOST_LIMITS.DESCRIPTION.MIN} - ${JOBPOST_LIMITS.DESCRIPTION.MAX} chars`,
            }
        ),

    skillIds: z
        .array(z.number())
        .min(
            JOBPOST_LIMITS.SKILLS.MIN,
            `Add at least ${JOBPOST_LIMITS.SKILLS.MIN} skills`
        )
        .max(
            JOBPOST_LIMITS.SKILLS.MAX,
            `Cannot add more than ${JOBPOST_LIMITS.SKILLS.MAX} skills`
        ),

});

export type UpdateJobPostFormData =
    z.infer<typeof updateJobPostSchema>;