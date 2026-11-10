import { Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Separator } from "@/common/components/ui/separator";
import { SUPPORT_EMAIL, supportTopics } from "../../constants/contact";

export const GetInTouch = () => {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Get in touch</CardTitle>
        <CardDescription>Reach out to us through our official support email.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl bg-card p-4 space-y-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Email Support</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm font-medium text-primary hover:underline break-all">
              {SUPPORT_EMAIL}
            </a>
          </div>
          <p className="text-xs text-muted-foreground">For account assistance, job applications, payments and general support.</p>
        </div>
        <Separator />
        <div className="space-y-3">
          <p className="text-sm font-medium">How can we help?</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {supportTopics.map((topic) => (
              <li key={topic}>• {topic}</li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground">We aim to respond within 1-2 business days.</p>
      </CardContent>
    </Card>
  );
};
