import FormError from "@/common/components/form/form-error";
import { Label } from "@/common/components/ui/label";
import FormCharacterCounter from "@/common/components/form/form-character-counter";
import { Textarea } from "@/common/components/ui/textarea";
import { SectionType } from "./EditProfileSheet";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/utils/show-api-error";
import { JobSeekerProfileResponse } from "../../types/jobseeker.types";
import { useUpdateJobSeekerProfile } from "../../hooks/useJobSeekerProfile";
import { AboutMeFormData, aboutMeSchema, PROFILE_LIMITS } from "../../schemas/jobseeker-profile.schema";

type AboutMeSectionProps = {
    activeSection: SectionType | null;
    setActiveSection: React.Dispatch<
        React.SetStateAction<SectionType | null>
    >;
    profileData: JobSeekerProfileResponse;
};
export default function AboutMeSection({ activeSection, setActiveSection, profileData, }: AboutMeSectionProps) {
    const { mutateAsync, isPending: loading } = useUpdateJobSeekerProfile();
    const { register, handleSubmit, watch, reset, formState: { errors, isDirty } } = useForm<AboutMeFormData>({
        resolver: zodResolver(aboutMeSchema),
    });

    useEffect(() => {
        if (profileData) {
            reset({
                aboutMe: profileData.aboutMe
            });
        }
    }, [profileData, reset]);

    const onSubmit = async (data: AboutMeFormData) => {
        try {
            const res = await mutateAsync({ aboutMe: data.aboutMe });
            toast.success(res.message ?? "Profile Updated Successfully.");
            setActiveSection(null);
        } catch (err: unknown) {
            showApiError(err);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
            <div className="rounded-2xl space-y-6 border bg-background p-6 min-h-fit">
                <div className="space-y-2">
                    <Label>About Me</Label>
                    <Textarea
                        disabled={loading}
                        {...register("aboutMe")}
                        placeholder="About Me"
                        minLength={PROFILE_LIMITS.ABOUT_ME.MIN}
                        maxLength={PROFILE_LIMITS.ABOUT_ME.MAX}
                        className="min-h-25 resize-none"
                    />
                    <FormCharacterCounter value={watch("aboutMe")} max={PROFILE_LIMITS.ABOUT_ME.MAX} />
                    <FormError message={errors.aboutMe?.message} />
                </div>

            </div>
            <Separator className="my-6" />

            {activeSection && (
                <div className="flex justify-between items-center gap-2 w-full">
                    <Button type="button" disabled={loading} variant="outline" className="flex-1 cursor-pointer" onClick={() => setActiveSection(null)}>
                        Back
                    </Button>
                    <Button type="submit" disabled={loading || !isDirty} className="flex-1 gradient-background cursor-pointer">
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