"use client";
import FormError from '@/common/components/form/form-error';
import ButtonSpinner from '@/common/components/loading/ButtonSpinner';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { useSendOtp } from '@/common/hooks/useOtp';
import { SendFormData, sendOtpSchema } from '@/common/schemas/otp.schema';
import { showApiError } from '@/common/utils/show-api-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type VerifyEmailProps = {
    onNext: () => void;
};

const VerifyEmail = ({ onNext }: VerifyEmailProps) => {

    const { mutateAsync, isPending } = useSendOtp();
    const { register, handleSubmit, formState: { errors } } = useForm<SendFormData>({
        resolver: zodResolver(sendOtpSchema),
        defaultValues: {
            email: ""
        }
    });
    const onSubmit = async (data: SendFormData) => {
        try {
            const subject = "Your verification code for account signup";
            const res = await mutateAsync({ ...data, subject });
            toast.success(res.message ?? "Check your email for OTP.");
            sessionStorage.setItem("register_email", data.email);
            sessionStorage.setItem("register_timestamp", Date.now().toString());
            onNext();
        }
        catch (err: unknown) {
            showApiError(err);
        }
    }
    return (
        <div className='h-full flex flex-col'>
            <div>
                <h2 className="text-2xl font-bold text-center mb-2 text-txt">
                    Create An Account
                </h2>
                <div className="h-1 w-16 gradient-background mx-auto rounded mb-6" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-txt" />
                    <Input
                        disabled={isPending}
                        required
                        type="email"
                        autoFocus
                        placeholder="Email"
                        autoComplete="email"
                        {...register("email")}
                        className="w-full h-12 text-lg border border-black/20 rounded-lg py-3 pl-12 pr-3 focus:outline-none focus:ring-2 focus:ring-secondary!"
                    />
                </div>
                <FormError message={errors.email?.message} />
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full gradient-background text-lg text-white py-3 h-12 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {isPending ? <ButtonSpinner className='text-white' /> : "Verify Email"}
                </Button>

            </form>
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

            <p className="text-center mt-6 text-txt">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold cursor-pointer">
                    Sign In
                </Link>
            </p>
        </div>
    )
}

export default VerifyEmail