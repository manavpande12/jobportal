"use client";

import ButtonSpinner from "@/common/components/loading/ButtonSpinner";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { useSendOtp, useVerifyOtp } from "@/common/hooks/useOtp";
import { verifyOtpSchema } from "@/common/schemas/otp.schema";
import { showApiError } from "@/common/utils/show-api-error";
import { OtpExpiryFormatTime } from "@/common/utils/timeformat";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";


type OtpPageProp = {
    onNext: () => void;
    onChange: () => void;
}

const OtpPage = ({ onNext, onChange }: OtpPageProp) => {

    const [otp, setOtp] = useState<Array<string>>(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState<number>(30); //30 sec
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const verifyOtpMutation = useVerifyOtp();
    const sendOtpMutation = useSendOtp();
    const loading = verifyOtpMutation.isPending || sendOtpMutation.isPending;
    //TIMER LOGIC
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);



    // HANDLE INPUT CHANGE
    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^0-9]/g, "").slice(-1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // Auto focus next
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    // HANDLE PASTE
    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement>
    ) => {

        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pastedData) return;

        const otpArray = pastedData
            .split("")
            .concat(new Array(6).fill(""))
            .slice(0, 6);

        setOtp(otpArray);

        const nextIndex =
            Math.min(pastedData.length, 5);

        inputsRef.current[nextIndex]?.focus();
    };

    //Handle Backspace
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // Handle AutoSubmit
    const hasSubmittedRef = useRef(false);

    useEffect(() => {
        if (otp.every(d => d !== "") && !hasSubmittedRef.current) {
            hasSubmittedRef.current = true;
            handleSubmit();
        }
    }, [otp]);

    const handleSubmit = async () => {

        const enteredOtp = otp.join("");
        const result = verifyOtpSchema.safeParse({
            otp: enteredOtp,
        });

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }
        const email = sessionStorage.getItem("register_email");
        if (!email) { onChange(); return; }
        try {
            const data = { email, enteredOtp };
            const res = await verifyOtpMutation.mutateAsync(data);
            sessionStorage.setItem("register_otp_verified", "true");
            toast.success(res.message ?? "Email verification completed.");
            onNext();
        }
        catch (err: unknown) {
            showApiError(err);
        }
    };

    //Resend OTP
    const handleResend = async () => {
        setOtp(new Array(6).fill(""));
        setTimeLeft(300);
        hasSubmittedRef.current = false;
        inputsRef.current[0]?.focus();
        const email = sessionStorage.getItem("register_email");
        if (!email) { onChange(); return; }
        try {
            const subject = "Your verification code for account password reset.";
            const data = { email, subject };
            const res = await sendOtpMutation.mutateAsync(data);
            toast.success(res.message ?? "Check your email for OTP.");
            sessionStorage.setItem("register_email", email);
        }
        catch (err: unknown) {
            showApiError(err);
        }
    };

    return (
        <div className="space-y-6 text-center ">
            <div>
                <h2 className="text-2xl font-bold text-center mb-2 text-txt">
                    Enter a 6-digit code
                </h2>
                <div className="h-1 w-16 gradient-background mx-auto rounded mb-6" />
            </div>
            <div className="text-muted-foreground text-sm font-medium text-left leading-0.5">
                <p>Check your email for a verification code.</p>
                <Button
                    variant="link"
                    disabled={loading}
                    onClick={() => onChange()}
                    className="text-primary font-medium hover:underline text-sm p-0"
                >
                    Change
                </Button>
            </div>

            {/* OTP BOXES */}
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

                <div className="flex justify-between animate-in zoom-in duration-1000">
                    {otp.map((data, index) => (
                        <Input
                            key={index}
                            disabled={loading}
                            type="tel"
                            autoFocus={index === 0}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete={index === 0 ? "one-time-code" : "off"}
                            maxLength={1}
                            value={data}
                            ref={(el) => {
                                inputsRef.current[index] = el;
                            }}
                            onPaste={handlePaste}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xs sm:text-xl font-bold rounded-lg border border-black/20 focus:outline-none focus:ring-2 focus:ring-secondary! transition text-foreground"
                        />
                    ))}
                </div>

                {/* TIMER */}
                <div className="flex justify-between mt-4 items-center">
                    <p className={`text-sm ${timeLeft <= 5 ? "text-red-500" : "text-muted-foreground"}`}>
                        Expire: {OtpExpiryFormatTime(timeLeft)}
                    </p>

                    <Button
                        variant="link"
                        onClick={handleResend}
                        type="button"
                        disabled={loading || timeLeft > 0}
                        className="text-primary font-medium hover:underline text-sm m-0! p-0!"
                    >
                        Resend OTP
                    </Button>
                </div>
                {/* VALIDATE BUTTON */}
                <Button
                    type="submit"
                    disabled={timeLeft <= 0 || loading}
                    className="w-full gradient text-white py-3 rounded-lg h-12 gradient-background font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? <ButtonSpinner className="text-white" /> : "Validate OTP"}
                </Button>
            </form>


            <p className='text-muted-foreground text-sm font-medium text-justify'>
                If you don't see the email in your inbox, check your spam
                folder. if it's not there, the email address may not be
                confirmed, or it may not match your email account.
            </p>

        </div>
    );
};

export default OtpPage;