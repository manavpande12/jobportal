// utils/show-api-error.tsx

import axios from "axios";
import { toast } from "sonner";

type ErrorResponse = {
    message?: string;
    data?: Record<string, string>;
};

export const showApiError = (
    err: unknown
) => {

    let message = "Something went wrong";

    if (axios.isAxiosError<ErrorResponse>(err)) {

        message =
            err.response?.data?.message ||
            message;

        const errors =
            err.response?.data?.data;

        if (errors) {

            toast.error(
                <div className="space-y-1">
                    <div className="font-semibold">
                        {message}
                    </div>

                    {Object.values(errors).map(
                        (msg, i) => (
                            <div
                                key={i}
                                className="
                                    text-sm
                                    opacity-90
                                "
                            >
                                • {msg}
                            </div>
                        )
                    )}
                </div>
            );

            return;
        }
    }

    else if (err instanceof Error) {
        message = err.message;
    }

    toast.error(message);
};