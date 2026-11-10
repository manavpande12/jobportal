import { GetInTouch } from "@/features/landing/components/contact/GetInTouch";
import { SendUsMessage } from "@/features/landing/components/contact/SendUsMessage";
import { Headset } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="relative min-h-[calc(100vh-5.25rem)] px-4 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute left-1/2 top-20 size-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-0 size-72 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
            <Headset className="size-7 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">We're here to help.</h1>

          <p className="text-muted-foreground mt-3">
            Have a question or need assistance? Send us a message and our support team will get back to you.
          </p>
        </header>

        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-6 items-start">
          <GetInTouch />
          <SendUsMessage />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
