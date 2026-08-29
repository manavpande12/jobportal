import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { showApiError } from "@/common/utils/show-api-error";
import { Button } from "@/common/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionType } from "./EditProfileSheet";
import { JobSeekerProfileResponse } from "../../types/jobseeker.types";
import { Separator } from "@/common/components/ui/separator";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { useUpdateJobSeekerProfile } from "../../hooks/useJobSeekerProfile";
import { ResumeFormData, resumeSchema } from "../../schemas/jobseeker-profile.schema";

type ResumeSectionProps = {
    activeSection: SectionType | null;
    setActiveSection: React.Dispatch<
        React.SetStateAction<SectionType | null>
    >;
    profileData: JobSeekerProfileResponse;
};


const MAX_FILE_SIZE = 4 * 1024 * 1024; // 5MB
export default function ResumeSection({ activeSection, setActiveSection, profileData, }: ResumeSectionProps) {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const { mutateAsync, isPending: loading } = useUpdateJobSeekerProfile();
    const { handleSubmit, watch, reset, setValue, formState: { isDirty } } = useForm<ResumeFormData>({
        resolver: zodResolver(resumeSchema),
    });
    const resumeUrl = watch("resumeUrl");

    useEffect(() => {
        if (profileData) {
            reset({
                resumeUrl: profileData.resumeUrl
            });
        }
    }, [profileData, reset]);


    const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed");
            e.target.value = "";
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            toast.error("File size must be less than 5MB");
            e.target.value = "";
            return;
        }
        try {
            setResumeFile(file);
            const formData = new FormData();
            formData.append("file", file);
            // upload logic
            setValue("resumeUrl", file.name, {
                shouldDirty: true,
                shouldValidate: true,
            });
            toast.success("Resume Selected");
        } catch (err) {
            showApiError(err);
        }
    };


    const onSubmit = async (data: ResumeFormData) => {
        try {
            const res = await mutateAsync({ resumeUrl: data.resumeUrl });
            toast.success(res.message ?? "Profile Updated Successfully.");
            setActiveSection(null);
        } catch (err: unknown) {
            showApiError(err);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
            <div className="rounded-2xl space-y-6 border bg-background p-6 min-h-fit">
                <div className="space-y-3">
                    <Label>Resume</Label>
                    {!resumeUrl ? (
                        <Label
                            htmlFor="resume-upload"
                            className="flex flex-col items-center justify-center w-full min-h-40 rounded-xl border-2 bg-muted/30 hover:bg-muted/50 hover:border-primary/40 transition-all duration-200 cursor-pointer group"
                        >
                            <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 group-hover:scale-105 transition-transform">
                                    <Upload className="w-7 h-7 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold">Upload your resume</p>
                                    <p className="text-xs text-muted-foreground">Only PDF up to 5MB</p>
                                </div>
                            </div>
                            <Input
                                id="resume-upload"
                                disabled={loading}
                                type="file"
                                accept=".pdf"
                                onChange={handleResumeChange}
                                className="hidden"
                            />
                        </Label>
                    ) : (

                        <div className="flex items-center gap-4 rounded-xl border bg-muted/30 p-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-semibold">{resumeFile?.name ?? resumeUrl}</p>
                                {resumeFile && <p className="text-xs text-muted-foreground"> {(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>}
                            </div>
                            <Label
                                htmlFor="resume-upload"
                                className="inline-flex items-center justify-center h-9 px-3 rounded-md border bg-background hover:bg-accent text-sm font-medium cursor-pointer transition-colors">
                                Change
                            </Label>
                        </div>
                    )}
                    <Input
                        id="resume-upload"
                        disabled={loading}
                        type="file"
                        accept=".pdf"
                        onChange={handleResumeChange}
                        className="hidden"
                    />
                </div>
            </div>
            <Separator className="my-6" />

            {activeSection && (
                <div className="flex justify-between items-center gap-2 w-full">
                    <Button type="button" disabled={loading} variant="outline" className="flex-1 cursor-pointer" onClick={() => setActiveSection(null)} >
                        Back
                    </Button>
                    <Button type="submit" disabled={loading || !isDirty} className="flex-1 gradient-background cursor-pointer" >
                        {loading ? (
                            <ButtonSpinner className="text-white" />
                        ) : (
                            "Save"
                        )}
                    </Button>
                </div>
            )}
        </form>
    );
}