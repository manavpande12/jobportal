import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { hsl } from "@/common/constants/color";

type HslColor = { h: number; s: number; l: number; };
type Props = {
    Icon: LucideIcon;
    title: string;
    value: ReactNode;
    rounded?: "full" | "square";
    color?: HslColor;
    size?: "sm" | "lg";
};

const DEFAULT_COLOR: HslColor = { h: 221, s: 70, l: 54, };
export default function InfoItem({ Icon, title, value, rounded = "full", color = DEFAULT_COLOR, size = "lg", }: Props) {
    const isLarge = size === "lg";

    return (
        <div className="flex items-center gap-4">
            <div
                style={{ backgroundColor: hsl(color, 0.05), borderColor: hsl(color, 0.1), color: hsl(color), }}
                className={`
                    flex items-center justify-center border
                    ${rounded === "full" ? "rounded-full" : "rounded-xl"}
                    ${isLarge ? "size-14" : "size-10"}
                `}
            >
                <Icon className={isLarge ? "size-6" : ""} />
            </div>
            <div className="min-w-0">
                <p
                    className={
                        isLarge
                            ? "text-sm font-medium text-muted-foreground"
                            : "text-xs font-medium text-muted-foreground"
                    }
                >
                    {title}
                </p>

                <div
                    className={
                        isLarge
                            ? "text-base font-semibold wrap-break-word"
                            : "text-sm font-semibold wrap-break-word"
                    }
                >
                    {value}
                </div>
            </div>
        </div>
    );
}