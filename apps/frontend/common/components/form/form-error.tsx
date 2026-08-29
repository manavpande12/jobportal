import { AlertTriangle } from "lucide-react";

type FormErrorProps = {
    message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;
    return (
        <div className="mt-2 flex items-center gap-2 highlight-destructive rounded-lg border border-destructive px-3 py-2 text-xs font-semibold">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{message}</p>
        </div>
    );
};

export default FormError;