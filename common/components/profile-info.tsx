import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type Props = {
    Icon: LucideIcon;
    title: string;
    value: ReactNode;
    rounded?: "full" | "square";
};

const ProfileInfo = ({ Icon, title, value, rounded = "full", }: Props) => {
    const roundedClass =
        rounded === "full"
            ? "rounded-full"
            : "rounded-xl";

    return (
        <div className="flex flex-row items-center gap-4">
            <div
                className={`highlight-brand flex items-center justify-center p-4 ${roundedClass}`}
            >
                <Icon className="h-6 w-6" />
            </div>

            <div className="flex flex-col">
                <h1 className="text-lg font-semibold">{title}</h1>

                <div className="text-sm font-bold break-all text-muted-foreground">
                    {value}
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;