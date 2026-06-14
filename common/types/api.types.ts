export type ApiResponse<T> = {
    data: T;
    message: string;
    status: number;
    success: boolean;
    timestamp: string;
};

export type PageResponse<T> = {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};