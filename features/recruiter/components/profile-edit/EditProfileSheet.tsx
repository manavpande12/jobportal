"use client";
import { Button } from "@/common/components/ui/button";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/common/components/ui/sheet";
import { BriefcaseBusiness, User } from "lucide-react";
import { useState } from "react";
import BasicInformationSection from "./BasicInformationSection";
import ProfessionalDetailsSection from "./ProffesionalDetailsSection";
import { RecruiterProfileResponse } from "../../types/recruiter.types";
import { useIsMobile } from "@/common/hooks/useMobile";
type EditProfileSheetProps = {
    data: RecruiterProfileResponse;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export type SectionType = | "basic" | "professional";
const EditProfileSheet = ({ open, onOpenChange, data }: EditProfileSheetProps) => {
    const isMobile = useIsMobile();
    const [activeSection, setActiveSection] = useState<SectionType | null>(null);
    const sections = [
        { id: "basic", title: "Basic Information", icon: User, },
        { id: "professional", title: "Professional Details", icon: BriefcaseBusiness },
    ] as const;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side={isMobile ? "bottom" : "right"}
                className={`h-full! p-0 overflow-hidden border-none flex flex-col bg-background ${isMobile
                    ? "h-[80vh]! rounded-t-[28px]"
                    : "w-full sm:max-w-md!"
                    }`}
            >
                <SheetHeader className="px-6 py-5 border-b bg-background/95 backdrop-blur sticky top-0 z-10">
                    <SheetTitle className="text-2xl font-bold gradient-text">
                        Edit Profile
                    </SheetTitle>
                    <SheetDescription>
                        Update your professional information and details.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1 min-h-0  px-6 py-2- w-full">
                    <div className="flex flex-col gap-3 mb-6">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            const active = activeSection === section.id;
                            return (
                                <Button type="button" key={section.id} variant={active ? "default" : "outline"} onClick={() => setActiveSection(section.id)}
                                    className={`w-full h-14 rounded-xl flex items-center cursor-pointer justify-start gap-3 transition-all ${active
                                        ? "gradient-background text-white border-none"
                                        : activeSection
                                            ? "hidden"
                                            : ""
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${active ? "bg-white/20" : "highlight-brand"}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-sm">
                                        {section.title}
                                    </span>
                                </Button>
                            );
                        })}
                    </div>
                    {/* CONTENT */}
                    {activeSection === "basic" && <BasicInformationSection activeSection={activeSection} profileData={data} setActiveSection={setActiveSection} />}
                    {activeSection === "professional" && <ProfessionalDetailsSection activeSection={activeSection} profileData={data} setActiveSection={setActiveSection} />}


                </ScrollArea>
            </SheetContent>
        </Sheet >
    );
};

export default EditProfileSheet;