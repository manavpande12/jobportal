import { cn } from "./utils";

export const richTextBaseClasses = cn(
    "tiptap",
    "prose prose-sm dark:prose-invert",
    "max-w-none",
    "prose-h1:text-primary",
    "prose-h1:my-2",
    "outline-none focus:outline-none",
    "prose-p:text-foreground",
    "prose-li:marker:text-primary",
    "prose-li:marker:font-bold",
    "prose-p:my-0",
    "prose-headings:my-0",
    "prose-ul:my-2 prose-ol:my-2",
    "prose-li:my-0"
);

export const richTextEditorClasses = cn(
    richTextBaseClasses,
    "h-[300px]",
    "p-4",
    "bg-background"
);

export const richTextViewerClasses = cn(
    richTextBaseClasses,
    "break-words",
    "[overflow-wrap:anywhere]"
);