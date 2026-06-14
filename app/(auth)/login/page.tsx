
import Image from "next/image";
import LoginPage from "@/features/auth/components/login/LoginPage";


export default function LoginPageLayout() {
    return (

        <div className="h-full w-full flex flex-1 flex-row-reverse bg-card relative">
            {/*  RIGHT SIDE  */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden">
                <Image
                    src="/images/job.png"
                    alt="City Background"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                />

            </div>

            {/*  RIGHT SIDE  */}
            <div className="w-full min-h-screen lg:w-1/2 flex items-center justify-center p-2 sm:p-8 ">
                <div className="w-full h-120 max-w-md bg-background rounded-2xl shadow-2xl p-8 animate-in sm:slide-in-from-left-50 sm:slide-in-from-bottom-0 slide-in-from-bottom-50 duration-1000 overflow-hidden">
                    <LoginPage />
                </div>
            </div>
        </div>

    );
}
