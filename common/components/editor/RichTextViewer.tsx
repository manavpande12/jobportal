"use client";

import { richTextViewerClasses } from "@/common/lib/rich-text-styles";
import { cn } from "@/common/lib/utils";
import DOMPurify from "dompurify";
import type { CSSProperties } from "react";

type Props = {
    html: string;
    color?: string;
};

export default function RichTextViewer({ html, color }: Props) {
    return (
        <div
            style={
                color
                    ? ({ "--viewer-primary": color, } as CSSProperties)
                    : undefined
            }
            className={cn(richTextViewerClasses, "rich-text-viewer")}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(html),
            }}
        />
    );
}