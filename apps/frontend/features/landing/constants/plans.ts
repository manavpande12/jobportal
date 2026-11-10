export type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
  validity?: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Everything you need to get started.",
    price: 0,
    badge: "Basic",
    features: [
      "Create your professional profile",
      "Upload your resume",
      "Browse available jobs",
      "Apply for job openings",
      "Get unlimited applies",
      "View new job postings after 24 hours",
      "Standard recruiter visibility",
    ],
    cta: "Get Started",
  },
  {
    id: "featured-candidate",
    name: "Featured Candidate",
    description: "Stand out and get early access to opportunities.",
    price: 499,
    validity: "30 days",
    badge: "Recommended",
    highlighted: true,
    features: [
      "Everything included in Free",
      "Exclusive Featured Candidate badge",
      "Highlighted candidate profile",
      "Enhanced recruiter visibility",
      "Priority placement in eligible recruiter searches",
      "Instant access to new job postings",
      "Apply before free candidates get access",
    ],
    cta: "Get Featured",
  },
];
