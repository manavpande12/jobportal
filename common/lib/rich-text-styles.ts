import { cn } from "./utils";

export const richTextBaseClasses = cn(
    "tiptap",
    "prose prose-sm dark:prose-invert",
    "max-w-none",
    "outline-none focus:outline-none",

    "prose-p:text-foreground",
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