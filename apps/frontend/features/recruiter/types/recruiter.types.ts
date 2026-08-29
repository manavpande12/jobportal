export type RecruiterProfileRequest = {
    firstName?: string;
    lastName?: string;
    designation?: string;
}


export type RecruiterProfileResponse = {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    designation: string;
}
