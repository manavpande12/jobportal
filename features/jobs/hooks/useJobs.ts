import { useQuery } from "@tanstack/react-query";
import { getJobPostById, searchJobs } from "../services/jobs.service";
import { JobSearchRequest } from "../types/jobs.types";

export const useGetJobById = (id?: string) => {
    return useQuery({
        queryKey: ["jobs", id],
        queryFn: async () => {
            const res = await getJobPostById(id!);
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetSearchJobs = (filter: JobSearchRequest) => {
    return useQuery({
        queryKey: ["jobs", filter],
        queryFn: () => searchJobs(filter),
        staleTime: 1000 * 60 * 5,
    });
};