"use client";
import RichTextEditor from "@/common/components/editor/RichTextEditor";
import FormCharacterCounter from "@/common/components/form/form-character-counter";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import SkillBadgeList from "@/common/components/skill/SkillBadgeList";
import SkillSelector from "@/common/components/skill/SkillSelector";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { sanitizeHtml } from "@/common/lib/sanitize-html";
import { getPlainText } from "@/common/utils/html";
import { buildPatchPayload } from "@/common/utils/patch-util";
import { showApiError } from "@/common/utils/show-api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateJobPost, useGetJobPostById, useUpdateJobPostById } from "../hooks/useJobPost";
import { useGetSkills } from "@/common/hooks/useSkills";
import { JOBPOST_LIMITS, UpdateJobPostFormData, updateJobPostSchema } from "../schemas/jobpost-schema";
import { JobPostDescriptionSample } from "../constants/job-post-desc-sample";

type JobPostFormProps = {
    isCreate?: boolean;
    postId?: string;
};

export default function JobPostForm({ isCreate, postId }: JobPostFormProps) {
    const { data: jobPostData, isLoading } = useGetJobPostById(isCreate ? undefined : postId);
    const { data: skillsData, isPending: isSkillPending } = useGetSkills();
    const { mutateAsync: updateMutateAsync, isPending: updateIsPending } = useUpdateJobPostById();
    const { mutateAsync: createMutateAsync, isPending: createIsPending } = useCreateJobPost();
    const { handleSubmit, register, reset, watch, setValue, formState: { isDirty, dirtyFields } } = useForm<UpdateJobPostFormData>({
        resolver: zodResolver(updateJobPostSchema),
        defaultValues: {
            title: "",
            description: isCreate ? JobPostDescriptionSample : "",
            skillIds: [],
        },
    });
    const loading = isLoading || updateIsPending || createIsPending || isSkillPending;
    const selectedSkillIds = watch("skillIds") ?? [];
    const selectedSkills = skillsData?.filter((skill) =>
        selectedSkillIds.includes(skill.id)
    );

    useEffect(() => {
        if (jobPostData && !isCreate) {
            reset({
                title: jobPostData.title,
                description: jobPostData.description,
                skillIds: jobPostData.skills.map((s) => s.id),
            });
        }
    }, [jobPostData, isCreate, reset]);


    const onSubmit = async (data: UpdateJobPostFormData) => {
        try {
            if (isCreate) {
                const payload: UpdateJobPostFormData = {
                    ...data,
                    description: sanitizeHtml(data.description),
                };
                const res = await createMutateAsync(payload);
                toast.success(res.message ?? "JobPost Created Successfully.");
                reset();
            } else {
                const payload = buildPatchPayload(data, dirtyFields,
                    {
                        description: sanitizeHtml,
                    }
                );
                const res = await updateMutateAsync({ id: postId, data: payload });
                toast.success(res.message ?? "JobPost Updated Successfully.");
                reset();
            }
        } catch (err: unknown) {
            showApiError(err);
        }
    };
    return (
        <div className="rounded-xl border bg-background px-3 py-6 xl:p-6 hover:shadow-sm flex flex-col h-full w-full ">
            <form onSubmit={handleSubmit(onSubmit, (errors) => {
                Object.values(errors).forEach((error) => {
                    if (error?.message) {
                        toast.error(error.message);
                    }
                });
            })} className="flex flex-1 flex-col ">
                {/* title */}
                <div className="space-y-2">
                    <Label>Job Title</Label>
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Software Engineer"
                            {...register("title")}
                            className="h-12 pl-10"
                        />
                    </div>
                    <FormCharacterCounter max={JOBPOST_LIMITS.TITLE.MAX} value={watch("title")} />
                </div>

                {/* description */}
                <div className="flex min-w-0 flex-col space-y-2">
                    <Label>Job Description</Label>
                    <RichTextEditor
                        value={watch("description")}
                        disabled={false}
                        placeholder="Describe the job role, responsibilities, requirements, and expectations..."
                        onChange={(value) =>
                            setValue("description", value, {
                                shouldDirty: true,
                                shouldValidate: true,
                            })
                        }
                    />
                    <FormCharacterCounter max={JOBPOST_LIMITS.DESCRIPTION.MAX} value={getPlainText(watch("description") ?? "")} />
                </div>
                <div className="space-y-4">
                    <Label>Skills</Label>
                    <SkillSelector
                        value={selectedSkillIds}
                        max={JOBPOST_LIMITS.SKILLS.MAX}
                        skillsData={skillsData}
                        isPending={isSkillPending}
                        disabled={loading}
                        onChange={(skills) =>
                            setValue("skillIds", skills, {
                                shouldDirty: true,
                                shouldValidate: true,
                            })
                        }
                    />
                    <FormCharacterCounter value={selectedSkillIds.length} max={JOBPOST_LIMITS.SKILLS.MAX} />
                    <SkillBadgeList skills={selectedSkills} size="lg" />
                </div>
                <div className="space-x-4 mt-4">
                    <Button disabled={loading} onClick={() => reset()} type="button" variant="outline" className="h-11 px-6" >
                        Cancel
                    </Button>
                    <Button disabled={loading || !isDirty} type="submit" className="gradient-background h-11 md:w-42 font-semibold shadow-sm text-white">
                        {loading ? <ButtonSpinner className="text-white" /> :
                            isCreate
                                ? "Create Job"
                                : "Save Changes"
                        }

                    </Button>
                </div>
            </form>
        </div>
    )
}