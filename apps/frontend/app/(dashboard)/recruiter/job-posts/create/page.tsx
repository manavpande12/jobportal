import JobPostForm from "@/features/jobpost/components/JobPostForm";
import JobPostTips from "@/features/jobpost/components/JobPostTips";

export default function CreateJobPostPage() {
    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 flex-1">
            <div className="xl:col-span-9 flex h-full" >
                <JobPostForm isCreate={true} />
            </div >
            < div className="absolute xl:relative xl:col-span-3 space-y-6 h-full" >
                <JobPostTips />
            </div >
        </div >
    );
}