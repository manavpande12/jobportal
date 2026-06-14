"use client";

import { useGetSearchJobs } from "../hooks/useJobs";

export default function JobList() {
    const { data, isLoading } = useGetSearchJobs({
        page: 0,
        size: 10,
        skillIds: [1, 2],
        title: "Software Engineer"
    });

    return (
        <section className="p-2 sm:p-6">


        </section>
    );
}