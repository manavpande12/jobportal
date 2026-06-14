"use client";

import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { FormatRoleLabel, RoleType } from "@/common/types/role.types";
import { Briefcase, Eye, EyeClosed, InfoIcon, User, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserFormFields, UserFormType } from "@/common/types/user-form.types";
import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { showApiError } from "@/common/utils/show-api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/features/auth/schemas/register.schema";
import { useRegister } from "@/features/auth/hooks/useAuth";
import FormError from "@/common/components/form/form-error";

type CreateUserProps = {
    onChange: () => void;
}

const CreateUser = ({ onChange }: CreateUserProps) => {
    const [role, setRole] = useState<RoleType>(RoleType.JOB_SEEKER);
    const [show, setShow] = useState<Record<string, boolean>>({});
    const toggle = (key: keyof UserFormType) => {
        setShow((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    const { mutateAsync, isPending } = useRegister();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        const email = sessionStorage.getItem("register_email");
        const isOtpVerified = sessionStorage.getItem("register_otp_verified") === "true";
        if (!email || !isOtpVerified) {
            toast.error("Session expired. Please verify email again.");
            onChange();
            return;
        }
        try {
            const res = await mutateAsync({
                firstName: data.firstName,
                lastName: data.lastName,
                email: email,
                password: data.password,
                role: role,
            });
            sessionStorage.clear()
            toast.success(res.message ?? "User Registered Successfully.");
            window.location.href = "/login";
        }
        catch (err: unknown) {
            showApiError(err);
        }
    };

    return (
        <div>
            {/* HEADER */}
            <div>
                <h2 className="text-2xl font-bold text-center mb-2 text-txt">
                    Register An Account
                </h2>
                <div className="h-1 w-16 gradient-background mx-auto rounded mb-6" />
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {UserFormFields.map((field, i) => {
                    const isPassword = field.type === "password";
                    const isVisible = show[field.name];

                    return (
                        < div key={field.name}>
                            <div

                                className={`relative animate-in ${i % 2 === 0 ? "slide-in-from-right" : "slide-in-from-left"
                                    } duration-1000`}
                            >
                                {/* ICON */}
                                {field.icon === "user" && (
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt" />
                                )}

                                {isPassword && (
                                    <>
                                        {isVisible ? (
                                            <Eye
                                                onClick={() => toggle(field.name)}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt cursor-pointer"
                                            />
                                        ) : (
                                            <EyeClosed
                                                onClick={() => toggle(field.name)}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt cursor-pointer"
                                            />
                                        )}
                                    </>
                                )}

                                {/* INPUT */}
                                <Input
                                    disabled={isPending}
                                    type={isPassword ? (isVisible ? "text" : "password") : "text"}
                                    placeholder={field.placeholder}
                                    autoComplete={field.autoComplete}
                                    {...register(field.name)}
                                    className="w-full border border-black/20 text-foreground h-12 rounded-lg py-3 pl-12 pr-3 focus:outline-none focus:ring-2 focus:ring-secondary!"
                                />
                            </div>
                            <FormError message={errors[field.name]?.message} />
                        </div>
                    );
                })}
                <div className="flex justify-between gap-4">
                    {Object.values(RoleType).slice(0, 2).map((el, idx) => {
                        const Icon = el === RoleType.JOB_SEEKER ? UserCheck : Briefcase;
                        const active = role === el;
                        return (
                            <Button
                                key={el + idx}
                                type="button"
                                disabled={isPending}
                                variant="outline"
                                className={`flex-1 flex-col py-16 ${active ? "border-primary! bg-primary/5!" : "bg-background!"} hover:bg-background! cursor-pointer animate-in duration-1000  ${idx == 0 ? "slide-in-from-left" : "slide-in-from-right"}`}
                                onClick={() => setRole(el)}
                            >
                                <div className={`rounded-full ${active ? "bg-primary/20" : "bg-card/80"} p-6`}>
                                    <Icon className={`${active ? "text-primary" : "text-muted-foreground"} size-6 text-center`} />
                                </div>

                                <span className={`${active ? "text-primary" : "text-muted-foreground"}  font-semibold`}>
                                    {FormatRoleLabel(el)}
                                </span>
                            </Button>
                        )
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <InfoIcon className="size-4 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">You cannot change the role later.</span>
                </div>

                {/* SUBMIT */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full gradient-background text-white h-12 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {isPending ? <ButtonSpinner className="text-white" /> : "Register →"}
                </Button>
            </form>
            <Button
                variant="link"
                type="button"
                disabled={isPending}
                onClick={onChange}
                className="text-primary font-medium hover:underline text-sm p-0 text-right"
            >
                Choose different account.
            </Button>

            {/* FOOTER */}
            <p className="text-sm text-muted-foreground mt-6 text-center">
                By creating an account, you agree to our{" "}
                <span className="text-primary cursor-pointer">
                    Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-primary cursor-pointer">
                    Privacy Policy
                </span>
            </p>
        </div>
    );
};

export default CreateUser;