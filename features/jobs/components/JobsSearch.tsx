import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Grip, Rocket, Search, Sparkles, ArrowRight, } from "lucide-react";
const skills = ["React", "Next.js", "Java", "Spring Boot", "TypeScript", "Node.js",];

export default function JobsSearch() {
    return (
        <section className="relative overflow-hidden min-h-150 bg-linear-to-b from-primary/5 via-background to-background">
            {/* Background Glow */}
            <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
            {/* Decorative Icons */}
            <Rocket className="absolute right-0 top-10 size-72 text-primary/5 rotate-12" />
            <Grip className="absolute -left-20 bottom-0 size-72 text-primary/5 rotate-45" />

            <div className="container relative mx-auto flex min-h-150 flex-col items-center justify-center px-4 text-center">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 backdrop-blur-sm">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-sm font-medium">
                        Discover opportunities from top companies
                    </span>
                </div>

                {/* Heading */}
                <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                    Find Your{" "}
                    <span className="gradient-text">
                        Dream Job
                    </span>
                </h1>

                <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
                    Search jobs by title or skills and connect with companies
                    building the future.
                </p>

                {/* Search Card */}
                <div className="mt-10 w-full max-w-4xl rounded-3xl border bg-background/80 p-3 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Frontend Developer, React, Java..."
                                className="h-14 border-0 bg-transparent pl-12 text-base shadow-none focus-visible:ring-0"
                            />
                        </div>

                        <Button className="gradient-background h-14 px-8 text-base font-semibold">
                            Search Jobs
                            <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </div>
                </div>

                {/* Popular Skills */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <span className="text-sm text-muted-foreground">
                        Popular:
                    </span>

                    {skills.map((skill) => (
                        <button
                            key={skill}
                            className="rounded-full border bg-background/70 px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5"
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}