"use client";
import { Button } from "@/common/components/ui/button";
import { File, LucideIcon, Plus, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

type ActionBtnType = {
    label: string;
    desc: string;
    Icon: LucideIcon;
    onClick: () => void;
}

export default function ActionBtnSection() {
    const router = useRouter();
    const ActionBtns: ActionBtnType[] = [
        {
            label: "Post A New Job",
            desc: "Create a new job opening",
            Icon: Plus,
            onClick: () => router.push("/recruiter/job-posts/create")
        },
        {
            label: "View Job Post",
            desc: "Manage your job posts",
            Icon: File,
            onClick: () => router.push("/recruiter/job-posts")
        },
        {
            label: "View Applicants",
            desc: "Browse all Applicants",
            Icon: Users,
            onClick: () => { }
        }
    ];
    return (

        <div className="h-full flex-1 bg-background rounded-xl flex flex-col py-4 px-3 xl:px-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-4">
                <div className="flex justify-center items-center rounded-full highlight-brand p-4">
                    <Zap className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold">Quick Actions</h1>
            </div>
            <div className="flex flex-row gap-4 items-center mt-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth">
                {ActionBtns.map((el) => (
                    <Button onClick={el.onClick} key={el.label} variant="outline" className="snap-start px-4! py-4! shrink-0 h-18! rounded-xl! flex items-center justify-between gap-2">
                        <div className="highlight-brand rounded-xl p-3">
                            <el.Icon className="text-primary w-6! h-6!" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-primary text-lg font-semibold">{el.label}</span>
                            <span className="text-muted-foreground text-sm font-medium">{el.desc}</span>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
}