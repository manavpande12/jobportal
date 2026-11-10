"use client";
import { Send, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Label } from "@/common/components/ui/label";
import { SyntheticEvent } from "react";
import { SUPPORT_EMAIL } from "../../constants/contact";

export const SendUsMessage = () => {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const body = `
Name: ${name}
Email: ${email}

Message:
${message}
  `.trim();

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      SUPPORT_EMAIL,
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>Fill in the details below and we'll get back to you.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Your name" maxLength={100} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" maxLength={254} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="How can we help?" maxLength={150} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Describe your query or issue..."
              rows={5}
              maxLength={5000}
              required
              className="resize-none"
            />
          </div>

          <Button type="submit" className="w-full">
            <Send className="size-4" />
            Send Message
          </Button>

          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <Mail className="size-3" />
            Opens your default email application.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
