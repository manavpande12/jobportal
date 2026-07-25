import JobDetail from "@/features/jobs/components/JobDetail";

type Prop = {
    params: Promise<{ companySlug: string; id: string; }>
}

export default async function JobPage({ params }: Prop) {
    const { id } = await params;
    return (
        <JobDetail id={id} />
    );
}