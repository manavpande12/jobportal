import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const ActionSection = () => {
    return (
        <section className="bg-background py-24 px-4 sm:px-12 flex flex-col items-center text-center">

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold max-w-4xl leading-tight animate-in fade-in zoom-in-95 duration-500">
                Ready to Land Your{" "}
                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Next Opportunity?
                </span>
            </h2>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg font-medium text-muted-foreground max-w-2xl mt-6 leading-relaxed">
                Apply to{" "}
                <mark className="highlight-brand px-1.5">
                    verified jobs
                </mark>
                , track every application, and get real responses all in one place.
            </p>

            {/* CTA */}

            <Link href="/register" className="mt-8 rounded flex justify-center items-center text-white cursor-pointer hover:scale-110 w-full max-w-sm h-12 text-lg font-semibold gradient-background shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started Now →
            </Link>


            {/* Trust line */}
            <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span className="text-xs sm:text-sm md:text-base font-medium">
                    No fake listings. No clutter. Just real opportunities.
                </span>
            </div>

        </section>
    );
};

export default ActionSection;