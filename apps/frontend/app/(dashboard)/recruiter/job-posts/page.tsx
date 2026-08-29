import JobPostView from "@/features/jobpost/components/JobPostView";
export default function JobPostsPage() {
    return (
        <div className="flex flex-1 flex-col rounded-xl border bg-background px-3 py-8 transition-all duration-300 hover:shadow-lg xl:px-6">
            <p className="text-md sm:text-lg font-semibold text-muted-foreground">
                Manage and track all your job postings.
            </p>
            <JobPostView />
        </div>
    );
}