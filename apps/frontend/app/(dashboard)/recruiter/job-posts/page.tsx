import JobPostView from "@/features/jobpost/components/JobPostView";
export default function JobPostsPage() {
    return (
        <div className="flex flex-1 flex-col rounded-xl border bg-background px-3 py-8 transition-all duration-300 hover:shadow-lg xl:px-6">
            <JobPostView />
        </div>
    );
}