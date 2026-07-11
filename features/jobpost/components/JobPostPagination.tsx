"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/common/components/ui/pagination";

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function JobPostPagination({ page, totalPages, onPageChange, }: Props) {
    if (totalPages <= 1) return null;

    return (
        <Pagination className="my-2">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => page > 0 && onPageChange(page - 1)}
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            isActive={page === index}
                            onClick={() => onPageChange(index)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            page < totalPages - 1 &&
                            onPageChange(page + 1)
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}