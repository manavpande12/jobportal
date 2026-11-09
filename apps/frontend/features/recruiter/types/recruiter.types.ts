export type RecruiterProfileRequest = {
  firstName?: string;
  lastName?: string;
  designation?: string;
};

export type RecruiterProfileResponse = {
  userId: string;
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  designation: string;
};
export type RecruiterPublicProfileResponse = {
  id: string;
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  designation: string;
};
