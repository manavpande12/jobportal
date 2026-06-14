"use client";

import { richTextViewerClasses } from "@/common/lib/rich-text-styles";
import { cn } from "@/common/lib/utils";
import DOMPurify from "dompurify";

type Props = {
    html: string;
};

export default function RichTextViewer({ html }: Props) {
    return (
        <div
            className={cn(richTextViewerClasses, "rich-text-viewer")}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(html),
            }}
        />
    );
}