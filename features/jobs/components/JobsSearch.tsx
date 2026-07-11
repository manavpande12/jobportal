"use client";

import React, { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronsUpDown, Grip, Loader2, Rocket, Search, Sparkles, } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/common/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { useGetSkills } from "@/common/hooks/useSkills";
import { Skills } from "@/common/types/skills";
import { JobSearchFilters } from "./JobsView";
import { toast } from "sonner";

interface SkillChipProps {
    skill: Skills;
    selected: boolean;
    onToggle: (skillId: number) => void;
}

const SkillChip = React.memo(
    ({ skill, selected, onToggle }: SkillChipProps) => {
        return (
            <Button variant="outline" className={clsx("shrink-0", selected && "highlight-brand")}
                onClick={() => onToggle(skill.id)}
            >
                {skill.name}
            </Button>
        );
    }
);

SkillChip.displayName = "SkillChip";


interface JobsSearchProps {
    onSearch: (filters: JobSearchFilters) => void;
    isLoading: boolean;
}
export default function JobsSearch({ onSearch, isLoading }: JobsSearchProps) {
    const { data: skills, isLoading: skillsLoading } = useGetSkills();
    const loading = skillsLoading || !skills;

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [skillIds, setSkillIds] = useState<number[]>([]);

    const selectedSkills = useMemo(() => new Set(skillIds), [skillIds]);
    const duplicatedSkills = useMemo(() => (skills ? [...skills, ...skills] : []), [skills]);

    const toggleSkill = useCallback((skillId: number) => {
        setSkillIds((prev) =>
            prev.includes(skillId)
                ? prev.filter((id) => id !== skillId)
                : [...prev, skillId]
        );
    }, []);

    const handleSearch = useCallback(() => {
        const trimmedTitle = title.trim();

        // At least one filter is required
        if (!trimmedTitle && skillIds.length === 0) {
            toast.error("Enter a job title or select at least one skill.");
            return;
        }
        onSearch({ title, skillIds });
    }, [title, skillIds, onSearch]);

    return (
        <section className="relative overflow-hidden min-h-150 bg-linear-to-b from-primary/5 via-background to-background">
            <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
            <Rocket className="absolute right-0 top-10 size-72 rotate-12 text-primary/5" />
            <Grip className="absolute -left-20 bottom-0 size-72 rotate-45 text-primary/5" />
            <div className="container relative mx-auto flex min-h-150 flex-col items-center justify-center px-4 text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 backdrop-blur-sm">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-sm font-medium">
                        Discover opportunities from top companies
                    </span>
                </div>
                <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                    Find Your{" "}
                    <span className="gradient-text">
                        Dream Job
                    </span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
                    Search jobs by title or skills and connect with companies
                    building the future.
                </p>
                <div className="mt-10 w-full max-w-4xl rounded-3xl border bg-background/80 p-3 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Frontend Developer, React, Java..."
                                className="h-14 border-0 bg-transparent pl-12 text-base shadow-none focus-visible:ring-0"
                            />
                        </div>

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="h-14 justify-between md:flex-1"
                                >
                                    {skillIds.length
                                        ? `${skillIds.length} skill(s) selected`
                                        : "Select skills"}

                                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <Command>
                                    <CommandInput placeholder="Search skills..." />
                                    <CommandList>
                                        <CommandEmpty>
                                            No skill found.
                                        </CommandEmpty>

                                        <CommandGroup>
                                            {skills?.map((skill) => (
                                                <CommandItem
                                                    key={skill.id}
                                                    value={skill.name}
                                                    onSelect={() =>
                                                        toggleSkill(skill.id)
                                                    }
                                                >
                                                    <Check
                                                        className={clsx("mr-2 h-4 w-4", selectedSkills.has(skill.id)
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                        )}
                                                    />

                                                    {skill.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        <Button
                            onClick={handleSearch}
                            className="gradient-background h-14 px-8 text-base font-semibold text-white"
                        >
                            {isLoading
                                ? <Loader2 className="size-4 " />
                                : <>
                                    Search Jobs
                                    <ArrowRight className="ml-2 size-4" />
                                </>}

                        </Button>
                    </div>
                </div>

                <div className="mt-8 flex w-full max-w-4xl items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                        Popular:
                    </span>

                    <div className="w-full overflow-hidden">
                        <motion.div
                            className="flex w-max gap-2"
                            animate={{ x: ["0%", "-50%"], }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            {loading
                                ? Array.from({ length: 10 }).map(
                                    (_, index) => (
                                        <Skeleton
                                            key={index}
                                            className="highlight-brand h-8 w-24 shrink-0 rounded-md"
                                        />
                                    )
                                )
                                : duplicatedSkills.map(
                                    (skill, index) => (
                                        <SkillChip
                                            key={`${skill.id}-${index}`}
                                            skill={skill}
                                            selected={selectedSkills.has(skill.id)}
                                            onToggle={toggleSkill}
                                        />
                                    )
                                )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}