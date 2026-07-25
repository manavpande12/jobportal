import JobPostPage from "@/features/jobpost/components/JobPostPage";

type Props = {
    params: Promise<{
        postId: string;
    }>;
};
export default async function JobViewPage({ params }: Props) {
    const { postId } = await params;
    return (
        <div className="flex-1 rounded-xl border bg-background px-3 py-6 xl:px-6">
            <JobPostPage id={postId} />
        </div>
    );
}