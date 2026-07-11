import { Skeleton } from "@/common/components/ui/skeleton";
import { JobPostResponse } from "../types/jobpost.types";
import JobPostCard from "./JobPostCard";

type prop = {
    data: JobPostResponse[]
    isLoading: boolean;
}
export default function JobPostList({ data, isLoading }: prop) {
    if (isLoading) {
        <div className="mt-4 flex flex-col gap-4">
            {
                Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="h-44 w-full animate-pulse rounded-2xl border bg-muted/40"
                    />
                ))
            }
        </div>
    }
    return (
        <section className="py-2 space-y-4">
            {data.map((job) => (
                <JobPostCard key={job.id} data={job} />
            ))}
        </section>
    );
}