"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/common/components/ui/pagination";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";

type Props = {
    page: number;
    totalPages: number;
    totalElements: number;
    size: number;
    onPageChange: (page: number) => void;
    onSizeChange: (size: number) => void;
};

export default function ApplicationPagination({ page, totalPages, totalElements, size, onPageChange, onSizeChange, }: Props) {
    const PAGE_SIZES = [5, 10, 20, 50];
    if (totalPages <= 1) return null;
    const start = page * size + 1;
    const end = Math.min((page + 1) * size, totalElements);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3 sm:px-5 sm:py-4">
            {/* Result Count */}
            <p className="shrink-0 text-xs text-muted-foreground sm:text-sm">
                Showing{" "}
                <span className="font-medium text-foreground">{start}</span>{" "}
                to{" "}
                <span className="font-medium text-foreground">{end}</span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                    {totalElements}
                </span>{" "}
                applications
            </p>

            {/* Size + Pagination */}
            <div className="flex items-center gap-2">
                {/* Size */}
                <Select
                    value={String(size)}
                    onValueChange={(value) => onSizeChange(Number(value))}
                >
                    <SelectTrigger className="h-9 w-18">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        {PAGE_SIZES.map((value) => (
                            <SelectItem key={value} value={String(value)}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Pagination */}
                <Pagination className="mx-0 w-auto">
                    <PaginationContent className="gap-1">
                        {/* Previous */}
                        <PaginationItem>
                            <PaginationPrevious
                                aria-label="Previous page"
                                onClick={() =>
                                    page > 0 && onPageChange(page - 1)
                                }
                                className="size-9 cursor-pointer rounded-md border bg-background p-0 [&>span]:hidden"
                            />
                        </PaginationItem>

                        {/* Pages */}
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={page === index}
                                    onClick={() => onPageChange(index)}
                                    className={
                                        page === index
                                            ? "size-9 cursor-pointer rounded-md bg-primary p-0 text-white"
                                            : "size-9 cursor-pointer rounded-md p-0"
                                    }
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Next */}
                        <PaginationItem>
                            <PaginationNext
                                aria-label="Next page"
                                onClick={() =>
                                    page < totalPages - 1 &&
                                    onPageChange(page + 1)
                                }
                                className="size-9 cursor-pointer rounded-md border bg-background p-0 [&>span]:hidden"
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}