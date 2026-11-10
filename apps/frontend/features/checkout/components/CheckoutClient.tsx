"use client";
import { Button } from "@/common/components/ui/button";

interface CheckoutClientProps {
  planId: string;
}

export const CheckoutClient = ({ planId }: CheckoutClientProps) => {
  const handlePayment = async () => {
    // Call backend checkout API
    // POST /api/v1/subscriptions/checkout
    console.log("Selected plan:", planId);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 min-h-[calc(100vh-5.25rem)]">
      <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
      <p className="text-muted-foreground mt-2">Review your selected plan before proceeding.</p>
      <div className="border rounded-xl p-6 mt-8">
        <p className="text-sm text-muted-foreground">Selected Plan ID</p>
        <p className="font-medium mt-1">{planId}</p>
        <Button className="w-full mt-6" onClick={handlePayment}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};
