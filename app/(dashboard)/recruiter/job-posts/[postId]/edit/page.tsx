import JobPostForm from "@/features/jobpost/components/JobPostForm";
import JobPostTips from "@/features/jobpost/components/JobPostTips";

type Props = {
    params: Promise<{
        postId: string;
    }>;
};

export default async function EditJobPostPage({ params }: Props) {
    const { postId } = await params;

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 h-full">
            <div className="xl:col-span-9 flex h-full">

                <JobPostForm
                    isCreate={false}
                    postId={postId}
                />
            </div>

            <div className="absolute xl:relative xl:col-span-3 space-y-6 h-full">
                <JobPostTips />
            </div>
        </div>
    );
}