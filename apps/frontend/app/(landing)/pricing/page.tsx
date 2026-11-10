import { PricingClient } from "@/features/landing/components/pricing/PricingClient";
import { ShieldCheck } from "lucide-react";

export const PricingPage = () => {
  return (
    <div className="relative min-h-[calc(100vh-5.25rem)] px-4 py-12">
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-primary/10">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Simple plans. Better opportunities.</h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Choose your plan and take the next step towards your career goals.</p>
        </div>

        {/* Pricing */}
        <PricingClient />

        {/* Footer note */}
        <p className="text-center text-xs text-gray-500 mt-8">
          A Featured Candidate badge improves profile visibility but does not guarantee an interview or job offer.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
