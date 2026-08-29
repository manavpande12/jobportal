"use client";

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__?: QueryClient;
    }
}

export default function TanstackProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [queryClient] = useState(() => {

        const client = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    refetchOnWindowFocus: false,
                    staleTime: 1000 * 60 * 5,
                },
            },
        });

        if (typeof window !== "undefined") {
            window.__TANSTACK_QUERY_CLIENT__ = client;
        }

        return client;
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}