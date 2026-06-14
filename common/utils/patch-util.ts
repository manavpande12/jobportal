import { FieldNamesMarkedBoolean } from "react-hook-form";

export function buildPatchPayload<T extends Record<string, unknown>>(
    values: T,
    dirtyFields: FieldNamesMarkedBoolean<T>,
    transformers?: Partial<{
        [K in keyof T]: (value: T[K]) => T[K];
    }>
): Partial<T> {
    const payload: Partial<T> = {};

    for (const key of Object.keys(dirtyFields) as (keyof T)[]) {
        if ((dirtyFields as Record<string, unknown>)[key as string]) {
            const value = values[key];

            payload[key] = transformers?.[key]
                ? transformers[key](value)
                : value;
        }
    }

    return payload;
}