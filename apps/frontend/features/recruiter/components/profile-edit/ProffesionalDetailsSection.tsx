import FormError from "@/common/components/form/form-error";
import { Label } from "@/common/components/ui/label";
import { useForm } from "react-hook-form";
import FormCharacterCounter from "@/common/components/form/form-character-counter";
import { Textarea } from "@/common/components/ui/textarea";
import { toast } from "sonner";
import { showApiError } from "@/common/utils/show-api-error";
import { Button } from "@/common/components/ui/button";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionType } from "./EditProfileSheet";
import { Separator } from "@/common/components/ui/separator";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { RecruiterProfileResponse } from "../../types/recruiter.types";
import { useUpdateRecruiterProfile } from "../../hooks/useRecruiterProfile";
import { ProfessionalDetailsFormData, professionalDetailsSchema, PROFILE_LIMITS } from "../../schemas/recruiter-profile.schema";

type ProfessionalDetailsSectionProps = {
    activeSection: SectionType | null;
    setActiveSection: React.Dispatch<
        React.SetStateAction<SectionType | null>
    >;
    profileData: RecruiterProfileResponse;
};


export default function ProfessionalDetailsSection({ activeSection, setActiveSection, profileData, }: ProfessionalDetailsSectionProps) {
    const { mutateAsync, isPending: loading } = useUpdateRecruiterProfile();
    const { register, handleSubmit, watch, reset, formState: { errors, isDirty, dirtyFields } } = useForm<ProfessionalDetailsFormData>({
        resolver: zodResolver(professionalDetailsSchema),
    });
    useEffect(() => {
        if (profileData) {
            reset({
                designation: profileData.designation,
            });
        }
    }, [profileData, reset]);

    const onSubmit = async (data: ProfessionalDetailsFormData) => {
        try {
            const payload: Partial<ProfessionalDetailsFormData> = {};
            if (dirtyFields.designation) {
                payload.designation = data.designation;
            }
            const res = await mutateAsync(payload);
            toast.success(res.message ?? "Profile Updated Successfully.");
            setActiveSection(null);
        } catch (err: unknown) {
            showApiError(err);
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="pb-4"
        >
            <div className="rounded-2xl space-y-6 border bg-background p-6 min-h-fit">
                <div className="space-y-2">
                    <Label>Designation</Label>
                    <Textarea
                        disabled={loading}
                        {...register("designation")}
                        placeholder="e.g. Senior Technical Recruiter"
                        minLength={PROFILE_LIMITS.DESIGNATION.MIN}
                        maxLength={PROFILE_LIMITS.DESIGNATION.MAX}
                        className="min-h-25 resize-none"
                    />
                    <FormCharacterCounter value={watch("designation")} max={PROFILE_LIMITS.DESIGNATION.MAX} />
                    <FormError message={errors.designation?.message} />
                </div>
            </div>
            <Separator className="my-6" />

            {activeSection && (
                <div className="flex justify-between items-center gap-2 w-full">
                    <Button type="button" disabled={loading} variant="outline" className="flex-1 cursor-pointer" onClick={() => setActiveSection(null)}>
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