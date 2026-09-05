"use client";

import { Search } from "lucide-react";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { hsl } from "@/common/constants/color";
import { APPLICATION_STATUS_CONFIG, ApplicationStatus } from "@/features/application/types/application.types";
import type { ApplicationFilterState } from "./ApplicationView";

type Props = {
    filter: ApplicationFilterState;
    onFilterChange: (key: keyof ApplicationFilterState, value: string) => void;
    onClear: () => void;
};

export function ApplicationFilter({ filter, onFilterChange, onClear }: Props) {
    const hasFilter = filter.search !== "" || filter.status !== "ALL" || filter.sort !== "NEWEST";

    return (
        <div className="flex flex-col gap-2 rounded-xl border bg-background p-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative min-w-0 flex-1 h-10">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={filter.search}
                    onChange={(e) => onFilterChange("search", e.target.value)}
                    placeholder="Search by job title or company..."
                    className="h-full pl-10"
                />
            </div>

            <div className="flex gap-2">
                {/* Status */}
                <Select
                    value={filter.status}
                    onValueChange={(value) => onFilterChange("status", value)}
                >
                    <SelectTrigger className="h-10! w-full sm:w-44">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">
                            <span className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-muted-foreground/60" />
                                All Status
                            </span>
                        </SelectItem>

                        {Object.entries(APPLICATION_STATUS_CONFIG).map(([key, status]) => {
                            const Icon = status.icon;

                            return (
                                <SelectItem key={key} value={key}>
                                    <span className="flex items-center gap-2">
                                        <span
                                            className="flex size-5 items-center justify-center rounded-md"
                                            style={{
                                                backgroundColor: hsl(status.color, 0.10),
                                                color: hsl(status.color),
                                            }}
                                        >
                                            <Icon className="size-3.5" />
                                        </span>
                                        <span>{status.label}</span>
                                    </span>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                {/* Sort */}
                <Select
                    value={filter.sort}
                    onValueChange={(value) => onFilterChange("sort", value)}
                >
                    <SelectTrigger className="h-10! w-full sm:w-48">
                        <SelectValue placeholder="Newest First" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="NEWEST">Newest First</SelectItem>
                        <SelectItem value="OLDEST">Oldest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Clear */}
            <Button
                type="button"
                variant="default"
                className="h-10 shrink-0 bg-card px-5 text-foreground"
                disabled={!hasFilter}
                onClick={onClear}
            >
                Clear
            </Button>
        </div>
    );
}