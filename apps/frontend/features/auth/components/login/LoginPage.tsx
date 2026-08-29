"use client";
import { useEffect, useState } from 'react';
import LoginUser from './LoginUser';
import VerifyEmail from './VerifyEmail';
import ResetPassword from './ResetPassword';
import OtpPage from './OtpPage';
import { useRouter } from 'next/navigation';

enum LoginStep {
    LOGIN_USER = 0,
    VERIFY_EMAIL = 1,
    OTP_PAGE = 2,
    RESET_PASSWORD = 3
}

const LoginPage = () => {
    const [step, setStep] = useState<LoginStep>(LoginStep.LOGIN_USER);
    const router = useRouter();

    useEffect(() => {

        const savedStep = Number(sessionStorage.getItem("login_step"));
        const savedEmail = sessionStorage.getItem("login_email");
        const otpVerified = sessionStorage.getItem("login_otp_verified") === "true";
        const timestamp = Number(sessionStorage.getItem("login_timestamp"));
        const isExpired = Date.now() - timestamp > 1000 * 60 * 10; // 10 min

        if (isExpired) {
            sessionStorage.clear();
            setStep(0);
            return;
        }
        if (!savedEmail) {
            setStep(LoginStep.VERIFY_EMAIL);
            return;
        }
        if (savedStep === LoginStep.RESET_PASSWORD && !otpVerified) {
            setStep(LoginStep.VERIFY_EMAIL);
            return;
        }
        if (otpVerified && savedEmail) {
            setStep(LoginStep.RESET_PASSWORD);
            return;
        }
        const isValidStep = Object.values(LoginStep).includes(savedStep as LoginStep);
        if (isValidStep) {
            setStep(savedStep as LoginStep);
            return;
        }
    }, [])

    useEffect(() => {
        sessionStorage.setItem("login_step", step.toString());
    }, [step]);

    return (
        <>
            {step === LoginStep.LOGIN_USER && <LoginUser onNext={() => setStep(LoginStep.VERIFY_EMAIL)} />}
            {step === LoginStep.VERIFY_EMAIL && <VerifyEmail onNext={() => setStep(LoginStep.OTP_PAGE)} onBack={() => setStep(LoginStep.LOGIN_USER)} />}
            {step === LoginStep.OTP_PAGE && <OtpPage onNext={() => setStep(LoginStep.RESET_PASSWORD)} onChange={() => { sessionStorage.clear(); setStep(LoginStep.VERIFY_EMAIL); }} />}
            {step === LoginStep.RESET_PASSWORD && <ResetPassword onNext={() => { sessionStorage.clear(); setStep(LoginStep.LOGIN_USER); }} onChange={() => { sessionStorage.clear(); router.replace("/register") }} />}
        </>
    )
}

export default LoginPage