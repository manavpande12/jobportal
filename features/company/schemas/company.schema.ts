import z from "zod";

export const COMPANY_LIMITS = {
    NAME: { MIN: 2, MAX: 60 },
    HEADLINE: { MIN: 2, MAX: 100 },
    INDUSTRY: { MIN: 2, MAX: 25 },
    DOMAIN: { MIN: 3, MAX: 255 },
    COMPANY_SIZE: { MIN: 1, MAX: 1_000_000 },
    FOUNDED_YEAR: { MIN: 1800, MAX: 2100 },
} as const;

const DOMAIN_REGEX =
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}$/;

export const updateCompanySchema = z.object({
    name: z
        .string().trim()
        .min(
            COMPANY_LIMITS.NAME.MIN,
            `Name must be ${COMPANY_LIMITS.NAME.MIN} - ${COMPANY_LIMITS.NAME.MAX} chars`
        )
        .max(
            COMPANY_LIMITS.NAME.MAX,
            `Name must be ${COMPANY_LIMITS.NAME.MIN} - ${COMPANY_LIMITS.NAME.MAX} chars`
        ),

    headline: z
        .string().trim()
        .min(
            COMPANY_LIMITS.HEADLINE.MIN,
            `Headline must be ${COMPANY_LIMITS.HEADLINE.MIN} - ${COMPANY_LIMITS.HEADLINE.MAX} chars`
        )
        .max(
            COMPANY_LIMITS.HEADLINE.MAX,
            `Headline must be ${COMPANY_LIMITS.HEADLINE.MIN} - ${COMPANY_LIMITS.HEADLINE.MAX} chars`
        ),

    industry: z
        .string().trim()
        .min(
            COMPANY_LIMITS.INDUSTRY.MIN,
            `Industry must be ${COMPANY_LIMITS.INDUSTRY.MIN} - ${COMPANY_LIMITS.INDUSTRY.MAX} chars`
        )
        .max(
            COMPANY_LIMITS.INDUSTRY.MAX,
            `Industry must be ${COMPANY_LIMITS.INDUSTRY.MIN} - ${COMPANY_LIMITS.INDUSTRY.MAX} chars`
        ),
    domain: z
        .string().trim()
        .min(
            COMPANY_LIMITS.DOMAIN.MIN,
            `Domain must be ${COMPANY_LIMITS.DOMAIN.MIN} - ${COMPANY_LIMITS.DOMAIN.MAX} chars`
        )
        .max(
            COMPANY_LIMITS.DOMAIN.MAX,
            `Domain must be ${COMPANY_LIMITS.DOMAIN.MIN} - ${COMPANY_LIMITS.DOMAIN.MAX} chars`
        ).regex(
            DOMAIN_REGEX,
            "Invalid domain format"
        ),

    companySize: z
        .number({
            error: "Company size is required",
        })
        .min(
            COMPANY_LIMITS.COMPANY_SIZE.MIN,
            `Company size must be at least ${COMPANY_LIMITS.COMPANY_SIZE.MIN}`
        )
        .max(
            COMPANY_LIMITS.COMPANY_SIZE.MAX,
            "Company size is too large"
        ),

    foundedYear: z
        .number({
            error: "Founded year is required",
        })
        .min(
            COMPANY_LIMITS.FOUNDED_YEAR.MIN,
            "Founded year is invalid"
        )
        .max(
            COMPANY_LIMITS.FOUNDED_YEAR.MAX,
            "Founded year is invalid"
        ),

});

export type UpdateCompanyFormData =
    z.infer<typeof updateCompanySchema>;