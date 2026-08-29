"use client";

import { Badge } from "@/common/components/ui/badge";
import { badgeColors } from "@/common/constants/color";
import { cn } from "@/common/lib/utils";

type Skill = { id: number; name: string; };
type SkillBadgeListProps = { skills?: Skill[]; emptyMessage?: string; size?: "sm" | "md" | "lg"; };
const sizeStyles = {
    sm: { badge: "h-5 px-2 text-[10px]", empty: "text-[10px]", },
    md: { badge: "h-6 px-2 text-xs", empty: "text-xs", },
    lg: { badge: "h-8 px-3 text-sm", empty: "text-sm", },
};

export default function SkillBadgeList({ skills, emptyMessage = "No skills added yet.", size = "md", }: SkillBadgeListProps) {
    const styles = sizeStyles[size];
    if (!skills?.length) {
        return (
            <span className={cn("text-muted-foreground font-semibold", styles.empty)}>
                {emptyMessage}
            </span>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
                <Badge
                    key={skill.id}
                    className={cn(
                        "rounded-xl font-semibold transition-transform duration-200 hover:scale-105",
                        styles.badge,
                        badgeColors[idx % badgeColors.length]
                    )}
                >
                    {skill.name}
                </Badge>
            ))}
        </div>
    );
}