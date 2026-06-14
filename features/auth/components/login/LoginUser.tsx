"use client";

import ButtonSpinner from '@/common/components/loading/ButtonSpinner';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Eye, EyeClosed, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react'
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from '@/features/auth/schemas/login.schema';
import { useLogin } from '@/features/auth/hooks/useAuth';
import FormError from '@/common/components/form/form-error';
import { showApiError } from '@/common/utils/show-api-error';

const LoginUser = ({ onNext }: { onNext: () => void; }) => {
    const { mutateAsync, isPending } = useLogin();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await mutateAsync({ email: data.email, password: data.password });
            toast.success(res.message ?? "Login Successful");
            window.location.href = "/";
        } catch (err: unknown) {
            showApiError(err);
        }
    };
    return (
        <div className='flex flex-col justify-between items-center h-full'>
            <div>
                <h2 className="text-2xl font-bold text-center mb-2 text-txt">
                    Login Your Account
                </h2>
                <div className="h-1 w-16 gradient-background mx-auto rounded mb-6" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt " />
                    <Input
                        type="email"
                        disabled={isPending}
                        autoFocus
                        placeholder="Email"
                        autoComplete='email'
                        {...register("email")}
                        className="w-full border border-black/20 text-foreground h-12 rounded-lg py-3 pl-12 pr-3 focus:outline-none focus:ring-2 focus:ring-secondary! "
                    />
                </div>
                <FormError message={errors.email?.message} />

                <div className="relative">
                    {showPassword && <Eye onClick={() => setShowPassword(false)} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt" />}
                    {!showPassword && <EyeClosed onClick={() => setShowPassword(true)} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt" />}
                    <Input
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                        placeholder="Password"
                        autoComplete='current-password'
                        {...register("password")}
                        className="w-full border border-black/20 text-foreground h-12 rounded-lg py-3 pl-12 pr-3 focus:outline-none focus:ring-2 focus:ring-secondary!"
                    />
                </div>
                <FormError message={errors.password?.message} />

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full gradient-background h-12 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition "
                >
                    {isPending ? <ButtonSpinner className='text-white' /> : "Sign In"}
                </Button>

            </form>
            <Button disabled={isPending} onClick={() => onNext()} variant='link' className="pl-0! text-sm font-medium">
                Forgot password?
            </Button>
            <p className="text-center mt-6 text-txt">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary font-semibold cursor-pointer">
                    Sign Up
                </Link>
            </p>
        </div>
    )
}

export default LoginUser