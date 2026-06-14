"use client";

import { useEffect } from "react";
import FormError from "@/common/components/form/form-error";
import FormCharacterCounter from "@/common/components/form/form-character-counter";
import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { useForm } from "react-hook-form";
import { Separator } from "@/common/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionType } from "./EditProfileSheet";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { showApiError } from "@/common/utils/show-api-error";
import { toast } from "sonner";
import SkillBadgeList from "@/common/components/skill/SkillBadgeList";
import SkillSelector from "@/common/components/skill/SkillSelector";
import { JobSeekerProfileResponse } from "../../types/jobseeker.types";
import { useGetSkills } from "@/common/hooks/useSkills";
import { useUpdateJobSeekerProfile } from "../../hooks/useJobSeekerProfile";
import { PROFILE_LIMITS, SkillsFormData, skillsSchema } from "../../schemas/jobseeker-profile.schema";
type SkillsSectionProps = {
    activeSection: SectionType | null;
    setActiveSection: React.Dispatch<
        React.SetStateAction<SectionType | null>
    >;
    profileData: JobSeekerProfileResponse;
};
export default function SkillsSection({ activeSection, setActiveSection, profileData }: SkillsSectionProps) {
    const { data: skillsData, isPending: isSkillPending } = useGetSkills();
    const { mutateAsync, isPending: isUpdatePending } = useUpdateJobSeekerProfile();
    const loading = isSkillPending || isUpdatePending;
    const { handleSubmit, watch, reset, setValue, formState: { errors, isDirty } } = useForm<SkillsFormData>({
        resolver: zodResolver(skillsSchema),
        defaultValues: {
            skills: []
        }
    });
    useEffect(() => {
        if (profileData) {
            reset({
                skills: profileData.skills.map(s => s.id),
            });
        }
    }, [profileData, reset]);
    const selectedSkillIds = watch("skills") ?? [];
    const selectedSkills = skillsData?.filter((skill) =>
        selectedSkillIds.includes(skill.id)
    );

    const onSubmit = async (data: SkillsFormData) => {
        try {
            const res = await mutateAsync({ skills: data.skills });
            toast.success(res.message ?? "Profile Updated Successfully.");
            setActiveSection(null);
        } catch (err: unknown) {
            showApiError(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pb-4" >
            <div className="rounded-2xl space-y-6 border bg-background p-6 min-h-fit">
                <div className="space-y-2">
                    <Label>Skills</Label>
                    <SkillSelector
                        value={selectedSkillIds}
                        isPending={isSkillPending}
                        skillsData={skillsData}
                        max={PROFILE_LIMITS.SKILLS.MAX}
                        disabled={loading}
                        onChange={(skills) =>
                            setValue("skills", skills, {
                                shouldDirty: true,
                                shouldValidate: true,
                            })
                        }
                    />
                    <FormCharacterCounter value={selectedSkillIds.length} max={PROFILE_LIMITS.SKILLS.MAX} />
                    <FormError message={errors.skills?.message} />
                    <SkillBadgeList skills={selectedSkills} />
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