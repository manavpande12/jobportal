"use client";
import { useState } from "react";
import { CheckCircle2, Lightbulb, } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogTitle, } from "@/common/components/ui/dialog";
import { JobPostingTips } from "../constants/job-posting-tips";

function TipsContent() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="highlight-brand rounded-md p-2">
                    <Lightbulb className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold xl:text-lg">
                    Tips for a great job post!
                </span>
            </div>
            <div className="max-h-[45vh] xl:max-h-fit space-y-3 overflow-y-auto pr-2">
                {JobPostingTips.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-primary text-white" />
                        <span className="text-sm font-semibold text-muted-foreground">{t}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function JobPostTips() {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* Desktop */}
            <div className="hidden rounded-xl border bg-background p-6 hover:shadow-sm xl:block">
                <TipsContent />
            </div>
            {/* Mobile */}
            <div className="xl:hidden">
                <Button
                    size="icon"
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl highlight-brand"
                >
                    <Lightbulb className="h-6! w-6!" />
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent aria-describedby={undefined} className="max-h-[60vh] overflow-hidden">
                        <DialogTitle className="hidden">
                            Job Posting Tips
                        </DialogTitle>
                        <TipsContent />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}