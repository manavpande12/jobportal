"use client";

import { Skeleton } from "@/common/components/ui/skeleton";
import { JobsResponse } from "../types/jobs.types";
import JobCard from "./JobCard";

interface JobListProps { jobs: JobsResponse[]; isLoading: boolean; }
export default function JobList({ jobs, isLoading, }: JobListProps) {
    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <section className="p-4 space-y-4">
            {jobs.map((job) => (
                <JobCard key={job.id} data={job} />
            ))}
        </section>
    );
}