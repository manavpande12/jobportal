"use client";
import FormCharacterCounter from "@/common/components/form/form-character-counter";
import FormError from "@/common/components/form/form-error";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { showApiError } from "@/common/utils/show-api-error";
import { useCreateCompany, useUpdateCompany } from "@/features/company/hooks/useCompany";
import { COMPANY_LIMITS, UpdateCompanyFormData, updateCompanySchema } from "@/features/company/schemas/company.schema";
import { CompanyResponse } from "@/features/company/types/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Calendar, Factory, Globe, Hash, Pen, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CreateEditCompanyProps = {
    data?: CompanyResponse;
    isCreate: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateEditCompany({ isCreate, open, setOpen, data }: CreateEditCompanyProps) {
    const { mutateAsync: updateMutateAsync, isPending: updateIsPending } = useUpdateCompany();
    const { mutateAsync: createMutateAsync, isPending: createIsPending } = useCreateCompany();
    const { handleSubmit, register, reset, watch, formState: { errors, isDirty, dirtyFields } } = useForm<UpdateCompanyFormData>({
        resolver: zodResolver(updateCompanySchema),
    });
    const loading = updateIsPending || createIsPending;
    useEffect(() => {
        if (data && !isCreate) {
            reset({
                name: data.name,
                headline: data.headline,
                domain: data.domain,
                companySize: data.companySize,
                foundedYear: data.foundedYear,
                industry: data.industry
            });
        }
    }, [data, isCreate, reset]);

    const onSubmit = async (data: UpdateCompanyFormData) => {
        try {
            if (isCreate) {
                const res = await createMutateAsync(data);
                toast.success(res.message ?? "Company Created Successfully.");
                reset();
                setOpen(false);
            }
            else {
                const payload: Partial<UpdateCompanyFormData> = {};
                if (dirtyFields.name) {
                    payload.name = data.name;
                }
                if (dirtyFields.headline) {
                    payload.headline = data.headline;
                }
                if (dirtyFields.domain) {
                    payload.domain = data.domain;
                }
                if (dirtyFields.industry) {
                    payload.industry = data.industry;
                }
                if (dirtyFields.foundedYear) {
                    payload.foundedYear = data.foundedYear;
                }
                if (dirtyFields.companySize) {
                    payload.companySize = data.companySize;
                }
                const res = await updateMutateAsync(payload);
                toast.success(res.message ?? "Company Updated Successfully.");
                reset();
                setOpen(false);
            }

        }
        catch (err: unknown) {
            showApiError(err);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-background p-0 shadow-2xl sm:max-w-2xl" showCloseButton={false}>
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-background px-6 py-6">
                    <div className="absolute right-0 top-0 opacity-10">+
                        <Sparkles className="h-28 w-28" />
                    </div>
                    <DialogHeader className="relative z-10 space-y-2">
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            {isCreate
                                ? "Create Company Profile"
                                : "Edit Company Profile"}
                        </DialogTitle>
                        <DialogDescription className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                            Add your company information to help candidates
                            understand your brand, culture, and organization.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-6 overflow-y-auto max-h-[60vh] scrollbar-none">
                    {/* Company Name */}
                    <div className="space-y-2">
                        <Label>Company Name</Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Microsoft"
                                {...register("name")}
                                className="h-12 pl-10"
                            />
                        </div>
                        <FormCharacterCounter max={COMPANY_LIMITS.NAME.MAX} value={watch("name")} />
                        <FormError message={errors.name?.message} />
                    </div>

                    {/* Headline */}
                    <div className="space-y-2">
                        <Label>Company Headline</Label>
                        <div className="relative">
                            <Pen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Short branding statement for your company"
                                {...register("headline")}
                                className="h-12 pl-10"
                            />
                        </div>
                        <FormCharacterCounter max={COMPANY_LIMITS.HEADLINE.MAX} value={watch("headline")} />
                        <FormError message={errors.headline?.message} />
                    </div>

                    {/* Industry + Domain */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Industry</Label>
                            <div className="relative">
                                <Factory className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="Information Technology"
                                    {...register("industry")}
                                    className="h-12 pl-10"
                                />
                            </div>
                            <FormCharacterCounter max={COMPANY_LIMITS.INDUSTRY.MAX} value={watch("industry")} />
                            <FormError message={errors.industry?.message} />
                        </div>

                        <div className="space-y-2">
                            <Label>Company Website</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="https://company.com"
                                    {...register("domain")}
                                    className="h-12 pl-10"
                                />
                            </div>
                            <FormError message={errors.domain?.message} />
                        </div>
                    </div>

                    {/* Company Size + Founded Year */}
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Company Size</Label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="number"
                                    disabled={loading}
                                    placeholder="500"
                                    {...register("companySize", { valueAsNumber: true })}
                                    className="h-12 pl-10"
                                />
                            </div>
                            <FormError message={errors.companySize?.message} />
                        </div>
                        <div className="space-y-2">
                            <Label>Founded Year</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="number"
                                    disabled={loading}
                                    placeholder="1998"
                                    {...register("foundedYear", { valueAsNumber: true })}
                                    className="h-12 pl-10"
                                />
                            </div>
                            <FormError message={errors.foundedYear?.message} />
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="gap-3 pt-4">
                        <DialogClose asChild>
                            <Button disabled={loading} onClick={() => reset()} type="button" variant="outline" className="h-11 px-6" >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button disabled={loading || !isDirty} type="submit" className="gradient-background h-11 md:w-44 font-semibold shadow-sm">
                            {loading ? <ButtonSpinner className="text-white" /> :
                                isCreate
                                    ? "Create Company"
                                    : "Save Changes"
                            }

                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}