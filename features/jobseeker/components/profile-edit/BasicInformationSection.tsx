import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/common/components/form/form-error";
import FormCharacterCounter from "@/common/components/form/form-character-counter";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Separator } from "@/common/components/ui/separator";
import { toast } from "sonner";
import { showApiError } from "@/common/utils/show-api-error";
import { SectionType } from "./EditProfileSheet";
import { BasicInformationFormData, basicInformationSchema, PROFILE_LIMITS } from "../../schemas/jobseeker-profile.schema";
import { useUpdateJobSeekerProfile } from "../../hooks/useJobSeekerProfile";
import { JobSeekerProfileResponse } from "../../types/jobseeker.types";



type BasicInformationSectionProps = {
    activeSection: SectionType | null;
    setActiveSection: React.Dispatch<
        React.SetStateAction<SectionType | null>
    >;
    profileData: JobSeekerProfileResponse;
};

const BasicInformationSection = ({ activeSection, setActiveSection, profileData, }: BasicInformationSectionProps) => {
    const { mutateAsync, isPending: loading } = useUpdateJobSeekerProfile();
    const { register, handleSubmit, watch, reset, formState: { errors, isDirty, dirtyFields } } = useForm<BasicInformationFormData>({
        resolver: zodResolver(basicInformationSchema),
    });

    useEffect(() => {
        if (profileData) {
            reset({
                firstName: profileData.firstName,
                lastName: profileData.lastName,
            });
        }
    }, [profileData, reset]);

    const onSubmit = async (data: BasicInformationFormData) => {
        try {
            const payload: Partial<BasicInformationFormData> = {};
            if (dirtyFields.firstName) {
                payload.firstName = data.firstName;
            }
            if (dirtyFields.lastName) {
                payload.lastName = data.lastName;
            }
            const res = await mutateAsync(payload);
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
                    <Label>First Name</Label>
                    <Input
                        disabled={loading}
                        type="text"
                        {...register("firstName")}
                        autoComplete="given-name"
                        placeholder="First Name"
                        minLength={PROFILE_LIMITS.FIRST_NAME.MIN}
                        maxLength={PROFILE_LIMITS.FIRST_NAME.MAX}
                    />
                    <FormCharacterCounter
                        value={watch("firstName")}
                        max={PROFILE_LIMITS.FIRST_NAME.MAX}
                    />
                    <FormError message={errors.firstName?.message} />
                </div>

                <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                        disabled={loading}
                        type="text"
                        {...register("lastName")}
                        autoComplete="family-name"
                        placeholder="Last Name"
                        minLength={PROFILE_LIMITS.LAST_NAME.MIN}
                        maxLength={PROFILE_LIMITS.LAST_NAME.MAX}
                    />
                    <FormCharacterCounter value={watch("lastName")} max={PROFILE_LIMITS.LAST_NAME.MAX} />
                    <FormError message={errors.lastName?.message} />
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
};

export default BasicInformationSection;