import { CheckoutClient } from "@/features/checkout/components/CheckoutClient";

interface CheckoutPageProps {
  searchParams: Promise<{
    planId?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { planId } = await searchParams;

  if (!planId) {
    return <div>Invalid plan selection.</div>;
  }

  return <CheckoutClient planId={planId} />;
}
