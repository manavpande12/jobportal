"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Hash } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/common/components/ui/command";
import { cn } from "@/common/lib/utils";
import { useGetSkills } from "@/common/hooks/mutations/useGetSkills";
import { Skills } from "@/common/types/skills";

type SkillSelectorProps = {
    value: number[];
    onChange: (skills: number[]) => void;
    max?: number;
    isPending?: boolean;
    skillsData?: Skills[];
    disabled?: boolean;
};

export default function SkillSelector({ value, onChange, max, disabled, skillsData, isPending }: SkillSelectorProps) {
    const [open, setOpen] = useState(false);
    const toggleSkill = (skillId: number) => {
        const exists = value.includes(skillId);
        if (exists) {
            onChange(value.filter((id) => id !== skillId));
            return;
        }
        if (max && value.length >= max) {
            return;
        }
        onChange([...value, skillId]);
    };

    return (
        <>
            <Button
                type="button"
                variant="outline"
                disabled={disabled || isPending}
                onClick={() => setOpen(true)}
                className="w-full justify-between h-12! text-muted-foreground"
            >
                <div className="flex gap-4 items-center">
                    <Hash className="w-4! h-4!" />
                    Select Skills
                </div>
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen} className="p-2!">
                <Command>
                    <CommandInput placeholder="Search skills..." />
                    <CommandList>
                        <CommandEmpty>No skill found.</CommandEmpty>
                        <CommandGroup heading="Skills">
                            {skillsData?.map((skill) => {
                                const selected = value.includes(skill.id);
                                return (
                                    <CommandItem className="h-10" key={skill.id} value={skill.name} onSelect={() => toggleSkill(skill.id)}>
                                        <Check className={cn("mr-2 h-4 w-4", selected ? "opacity-100" : "opacity-0")} />
                                        {skill.name}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}