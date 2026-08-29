"use client";

import FormError from '@/common/components/form/form-error';
import ButtonSpinner from '@/common/components/loading/ButtonSpinner';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { useForgetPassword } from '@/features/auth/hooks/useAuth';
import { ForgetPasswordFormData, forgetPasswordSchema } from '@/features/auth/schemas/forgetPassword.schema';
import { showApiError } from '@/common/utils/show-api-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ResetPasswordProps = {
    onNext: () => void;
    onChange: () => void;
}

const ResetPassword = ({ onNext, onChange }: ResetPasswordProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false)
    const { mutateAsync, isPending } = useForgetPassword();
    const { register, handleSubmit, formState: { errors } } = useForm<ForgetPasswordFormData>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            password: "", confirmPassword: ""
        }
    });


    const onSubmit = async (data: ForgetPasswordFormData) => {
        try {
            const email = sessionStorage.getItem("login_email");
            const isOtpVerified = sessionStorage.getItem("login_otp_verified") === "true";
            if (!email || !isOtpVerified) {
                toast.error("Session expired. Please verify email again.");
                setTimeout(() => {
                    onNext();
                }, 3000);
                return;
            }
            const res = await mutateAsync({ email: email, newPassword: data.password });
            toast.success(res.message ?? "Password Reset Successfully.");
            onNext();
        }
        catch (err: unknown) {
            showApiError(err);
            setTimeout(() => {
                onChange();
            }, 3000);
        }
    }
    return (
        <div className='h-full flex flex-col justify-between items-center'>
            <div className='flex-1'>
                <h2 className="text-2xl font-bold text-center mb-2 text-txt">
                    New Credentials
                </h2>
                <div className="h-1 w-16 gradient-background mx-auto rounded mb-6" />
            </div>
            <p className='text-muted-foreground text-sm text-left  mb-6'>
                Your identity has been verified!
                Set your new password for an account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full flex-2">
                <div className="relative animate-in slide-in-from-right duration-1000">
                    {showPassword && <Eye onClick={() => setShowPassword(false)} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt" />}
                    {!showPassword && <EyeClosed onClick={() => setShowPassword(true)} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt" />}
                    <Input
                        disabled={isPending}
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        autoComplete='new-password'
                        {...register("password")}
                        className="w-full border border-black/20 h-12 text-foreground rounded-lg py-3 pl-12 pr-3 focus:outline-none focus:ring-2 focus:ring-secondary!"
                    />
                </div>
                <FormError message={errors.password?.message} />


                <div className="relative animate-in slide-in-from-left duration-1000">
                    {showConfirmedPassword && <Eye onClick={() => setShowConfirmedPassword(false)} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt" />}
                    {!showConfirmedPassword && <EyeClosed onClick={() => setShowConfirmedPassword(true)} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt" />}

                    <Input
                        disabled={isPending}
                        type={showConfirmedPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        autoComplete='new-password'
                        {...register("confirmPassword")}
                        className="w-full border border-black/20 text-foreground h-12 rounded-lg py-3 pl-12 pr-3 focus:outline-none focus:ring-2 focus:ring-secondary!"
                    />
                </div>
                <FormError message={errors.confirmPassword?.message} />
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full gradient-background h-12 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {isPending ? <ButtonSpinner className='text-white' /> : "Update"}
                </Button>
            </form>
            <p className="text-center mt-6">
                Remembered your password ?{" "}
                <Button type='button' onClick={() => onChange()} disabled={isPending} variant="link" className="text-primary font-semibold cursor-pointer text-md">
                    Sign In
                </Button>
            </p>
        </div>
    )
}

export default ResetPassword 