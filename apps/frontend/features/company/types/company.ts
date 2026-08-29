export type UpdateCompanyRequest = {
    name?: string;
    headline?: string;
    industry?: string;
    domain?: string;
    companySize?: number;
    foundedYear?: number;
}

export type CreateCompanyRequest = {
    name: string;
    headline: string;
    industry: string;
    domain: string;
    companySize: number;
    foundedYear: number;
}

export type CompanyResponse = {
    id: string,
    name: string;
    slug: string;
    headline: string;
    industry: string;
    domain: string;
    companySize: number;
    foundedYear: number;
    createdAt: string;
    updatedAt: string;
}
