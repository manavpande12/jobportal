
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import ButtonSpinner from "./loading/ButtonSpinner";

type SettingCardProps = {
    title: string;
    description: string;
    Icon: LucideIcon;
    isDestructive: boolean;
    loading: boolean;
    actionLabel: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const SettingCard = ({ title, description, Icon, isDestructive = false, loading = false, actionLabel, onClick }: SettingCardProps) => {
    return (<div className="border rounded-xl shadow-sm flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-6">

        {/* Left Section (Icon + Content) */}
        <div className="flex items-start gap-4 flex-1">

            {/* Icon */}
            <div className={`rounded-full p-4 md:p-5 ${isDestructive ? "highlight-destructive" : "highlight-brand"} shrink-0 `}>
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <h1 className="font-semibold text-base md:text-lg">
                    {title}
                </h1>
                <p className="text-muted-foreground text-sm">
                    {description}
                </p>
            </div>

        </div>

        {/* Button */}
        <div className="w-full md:w-auto">
            <Button
                type="button"
                variant="ghost"
                disabled={loading}
                onClick={loading ? undefined : onClick}
                className={`w-full md:w-40 font-bold ${isDestructive ? "highlight-destructive" : "highlight-brand"} cursor-pointer`}
            >
                {loading ? <ButtonSpinner /> : actionLabel}
            </Button>
        </div>

    </div>

    );
}

export default SettingCard;