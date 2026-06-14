type FormCharacterCounterProps = {
    value?: string | number;
    max: number;


};

export default function FormCharacterCounter({ value = "", max }: FormCharacterCounterProps) {
    const length =
        typeof value === "string"
            ? value.length
            : value;
    const percentage = (length / max) * 100;
    const colorClass =
        percentage > 100
            ? "text-destructive"
            : percentage >= 70
                ? "text-green-500"
                : "text-muted-foreground";

    return (
        <div className="flex items-center justify-end gap-2">

            {/* Progress Bar */}
            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                    className={`h-full transition-all duration-300
                    ${percentage > 100
                            ? "bg-destructive"
                            : percentage >= 70
                                ? "bg-green-500"
                                : "bg-primary/60"
                        }`}
                    style={{
                        width: `${Math.min(percentage, 100)}%`,
                    }}
                />

            </div>

            {/* Counter */}
            <span
                className={`text-xs font-medium transition-colors duration-300 ${colorClass}`}
            >
                {length}/{max}
            </span>

        </div>
    );
}