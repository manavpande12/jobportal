export const badgeColors = [
    "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
    "bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-300",
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",
    "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
];

/**
 * Generates a deterministic color from a string.
 * Example: "React" -> "#4F8FEA"
 */
const palette = [
    { h: 217, s: 55, l: 50 }, // Blue
    { h: 193, s: 52, l: 46 }, // Cyan
    { h: 165, s: 42, l: 42 }, // Teal
    { h: 150, s: 38, l: 42 }, // Emerald
    { h: 247, s: 46, l: 54 }, // Indigo
    { h: 272, s: 42, l: 52 }, // Violet
    { h: 34, s: 58, l: 48 },  // Amber
    { h: 20, s: 55, l: 50 },  // Orange
];

export function getColorFromText(text: string) {
    let hash = 2166136261;

    for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    return palette[(hash >>> 0) % palette.length];
}

export function hsl(color: { h: number; s: number; l: number }, alpha = 1) {
    return `hsl(${color.h} ${color.s}% ${color.l}% / ${alpha})`;
}



/**
 * Generates a deterministic color from a status string.
 */

type Status = | "ACTIVE" | "DRAFT" | "PAUSED" | "CLOSED" | "EXPIRED" | "PENDING";
const statusColors: Record<Status, { h: number; s: number; l: number }> = {
    ACTIVE: { h: 221, s: 70, l: 54 }, // Modern Blue (#3B82F6)
    DRAFT: { h: 43, s: 90, l: 52 }, // Amber (#F59E0B)
    PAUSED: { h: 191, s: 65, l: 46 }, // Cyan (#06B6D4)
    CLOSED: { h: 0, s: 72, l: 51 }, // Red (#DC2626)
    EXPIRED: { h: 273, s: 65, l: 58 }, // Violet (#8B5CF6)
    PENDING: { h: 165, s: 70, l: 40 }, // Emerald/Teal (#10B981)
};
const defaultStatusColor = { h: 220, s: 10, l: 45 }; // Neutral Slate

export function getColorFromStatus(status?: string) {
    if (!status) return defaultStatusColor;
    return (
        statusColors[status.toUpperCase() as keyof typeof statusColors] ??
        defaultStatusColor
    );
}