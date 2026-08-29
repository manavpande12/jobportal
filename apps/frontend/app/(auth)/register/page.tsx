
import Image from "next/image";
import { Globe, LocationEditIcon, LucideChartNoAxesCombined } from "lucide-react";
import RegisterPage from "@/features/auth/components/register/RegisterPage";

const aspect = [
    {
        icon: LucideChartNoAxesCombined,
        label: "Top Companies"
    },
    {
        icon: LocationEditIcon,
        label: "Fast & Secure"
    },
    {
        icon: Globe,
        label: "Global Jobs"
    }
];

export default function RegisterPageLayout() {
    return (
        <div className="h-full w-full flex flex-1 bg-card relative">
            {/*  LEFT SIDE  */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden">
                <Image
                    src="/images/city.PNG"
                    alt="City Background"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/5" />

                {/* Content */}
                <div className="relative z-10 mt-21 flex flex-col px-20 w-full justify-center">
                    {/* Heading */}
                    <h1 className="text-5xl font-bold leading-tight text-white mt-0 animate-in slide-in-from-left duration-1000">
                        Join the Future of{" "}
                        <span className="gradient-text font-bold">
                            Work Opportunities
                        </span>
                    </h1>

                    <p className="mt-3 text-lg tracking-widest text-white mb-35 animate-in slide-in-from-left duration-1000">
                        Discover Your Dream Career
                    </p>

                    {/* Feature Boxes */}
                    <div className="flex flex-row gap-6 mt-8">
                        {aspect.map((item, i) =>
                            <div key={i} className="bg-white/3 backdrop-blur-md p-6 flex-1 rounded-xl flex flex-col items-center text-center animate-in zoom-in duration-1000">
                                <item.icon className="w-10 h-10 text-primary mb-2" />
                                <p className="text-sm font-medium text-white">{item.label}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/*  RIGHT SIDE  */}
            <div className="w-full min-h-screen lg:w-1/2 flex items-center justify-center p-2 sm:p-8 ">
                <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl p-8 animate-in sm:slide-in-from-right-50 sm:slide-in-from-bottom-0 slide-in-from-bottom-50 duration-1000 overflow-hidden">
                    <RegisterPage />
                </div>
            </div>
        </div>

    );
}
