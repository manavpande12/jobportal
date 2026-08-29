export type ApiResponse<T> = {
    data: T;
    message: string;
    status: number;
    success: boolean;
    timestamp: string;
};

export type PageResponse<T> = {
    content: T[];
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
};