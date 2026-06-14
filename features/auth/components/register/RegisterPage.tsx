"use client";
import { useEffect, useState } from "react";
import VerifyEmail from "./VerifyEmail";
import OtpPage from "./OtpPage";
import CreateUser from "./CreateUser";

enum RegisterStep {
    VERIFY_EMAIL = 0,
    OTP = 1,
    CREATE_USER = 2,
}

const RegisterPage = () => {
    const [step, setStep] = useState<RegisterStep>(RegisterStep.VERIFY_EMAIL);

    useEffect(() => {
        const savedStep = Number(sessionStorage.getItem("register_step"));
        const savedEmail = sessionStorage.getItem("register_email");
        const otpVerified = sessionStorage.getItem("register_otp_verified") === "true";
        const timestamp = Number(sessionStorage.getItem("register_timestamp"));
        const isExpired = Date.now() - timestamp > 1000 * 60 * 10; // 10 min

        if (isExpired) {
            sessionStorage.clear();
            setStep(0);
            return;
        }
        if (!savedEmail) {
            setStep(RegisterStep.VERIFY_EMAIL);
            return;
        }
        if (savedStep === RegisterStep.CREATE_USER && !otpVerified) {
            setStep(RegisterStep.OTP);
            return;
        }
        if (otpVerified && savedEmail) {
            setStep(RegisterStep.CREATE_USER);
            return;
        }
        const isValidStep = Object.values(RegisterStep).includes(savedStep as RegisterStep);
        if (isValidStep) {
            setStep(savedStep as RegisterStep);
            return;
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem("register_step", step.toString());
    }, [step]);

    const reset = () => {
        sessionStorage.clear();
        setStep(RegisterStep.VERIFY_EMAIL);
    }

    return (
        <>
            {step === RegisterStep.VERIFY_EMAIL && <VerifyEmail onNext={() => setStep(RegisterStep.OTP)} />}
            {step === RegisterStep.OTP && <OtpPage onNext={() => setStep(RegisterStep.CREATE_USER)} onChange={() => {
                sessionStorage.clear();
                setStep(RegisterStep.VERIFY_EMAIL);
            }} />}
            {step === RegisterStep.CREATE_USER && <CreateUser onChange={() => {
                sessionStorage.clear();
                setStep(RegisterStep.VERIFY_EMAIL);
            }} />}
        </>
    );
};

export default RegisterPage;