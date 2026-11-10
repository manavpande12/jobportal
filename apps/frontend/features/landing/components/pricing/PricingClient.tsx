"use client";
import { Check, Sparkles } from "lucide-react";
import { plans } from "../../constants/plans";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { useRouter } from "next/navigation";

export const PricingClient = () => {
  const router = useRouter();
  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      router.push("/login");
      return;
    }
    const params = new URLSearchParams({ planId });
    router.push(`/pricing/checkout?${params.toString()}`);
  };
  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
      {plans.map(({ id, name, description, price, validity, badge, highlighted, features, cta }) => (
        <Card key={id} className={`relative mt-3 bg-background flex flex-col ${highlighted ? "ring-primary! shadow-lg shadow-primary/10" : ""}`}>
          {highlighted && (
            <Badge className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 gap-1 whitespace-nowrap">
              <Sparkles className="size-3" />
              {badge}
            </Badge>
          )}
          {highlighted && <div className="absolute pointer-events-none right-0 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />}
          <CardHeader>
            <CardTitle className="flex items-center gap-2">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div className="flex items-baseline gap-1 pt-3">
              <span className="text-4xl font-bold">₹{price}</span>
              {validity && <span className="text-sm text-muted-foreground">/ {validity}</span>}
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <Separator className="mb-5" />
            <p className="text-sm font-medium mb-4">What's included</p>
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className={`size-4 shrink-0 mt-0.5 ${highlighted ? "text-primary" : "text-green-600"}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={highlighted ? "default" : "outline"} onClick={() => handleSelectPlan(id)}>
              {cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
