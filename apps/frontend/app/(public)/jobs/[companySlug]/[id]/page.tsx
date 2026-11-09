import type { Metadata } from "next";
import JobDetail from "@/features/jobs/components/JobDetail";
import { getJobById } from "@/features/jobs/services/jobs.service";

type Prop = {
  params: Promise<{
    companySlug: string;
    id: string;
  }>;
};

// SEO and Social Sharing Metadata
export async function generateMetadata({ params }: Prop): Promise<Metadata> {
  const { companySlug, id } = await params;
  const response = await getJobById(id);
  const job = response.data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const title = `${job.title} at ${job.companyName}`;
  const description = `Explore this ${job.title} opportunity at ${job.companyName}.`;
  const pageUrl = `${baseUrl}/jobs/${companySlug}/${id}`;
  const imageUrl = `${baseUrl}/images/job.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Job Portal",
      images: [
        {
          url: imageUrl,
          width: 512,
          height: 512,
          alt: "Job Portal Logo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function JobPage({ params }: Prop) {
  const { id } = await params;
  return <JobDetail id={id} />;
}
