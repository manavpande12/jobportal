import { Skills } from "@/common/types/skills";

export type JobSeekerProfileResponse = {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  resumeUrl: string;
  yearsOfExperience: number;
  headline: string;
  aboutMe: string;
  skills: Skills[];
};
export type JobSeekerPublicProfileResponse = {
  email: string;
  firstName: string;
  lastName: string;
  resumeUrl: string | null;
  yearsOfExperience: number | null;
  headline: string | null;
  aboutMe: string | null;
  skills: Skills[] | null;
};

export type JobSeekerProfileRequest = {
  firstName?: string;
  lastName?: string;
  resumeUrl?: string;
  yearsOfExperience?: number;
  headline?: string;
  aboutMe?: string;
  skills?: number[];
};
