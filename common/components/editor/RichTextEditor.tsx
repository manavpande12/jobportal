"use client";

import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { EditorContent, useEditor } from "@tiptap/react";
import { cn } from "@/common/lib/utils";
import RichTextToolbar from "./RichTextToolbar";
import { richTextEditorClasses } from "@/common/lib/rich-text-styles";
type Props = {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
};

export default function RichTextEditor({ value, onChange, placeholder, disabled, }: Props) {
    const editor = useEditor({
        immediatelyRender: false,
        editable: !disabled,
        content: value ?? "",
        extensions: [
            StarterKit.configure({}),
            Placeholder.configure({ placeholder: placeholder ?? "Write something amazing...", }),
            Highlight.configure({}),
        ],
        editorProps: { attributes: { class: richTextEditorClasses, }, },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;
        const current = editor.getHTML();
        if ((value ?? "") !== current) {
            editor.commands.setContent(value ?? "", {
                emitUpdate: false,
            });
        }
    }, [editor, value]);

    if (!editor) return null;

    return (
        <div className="flex min-w-0 flex-1 flex-col rounded-xl border bg-background overflow-hidden">
            <RichTextToolbar editor={editor} />
            <EditorContent
                editor={editor}
                className={cn("overflow-y-auto", disabled && "pointer-events-none opacity-60")}
            />
        </div>
    );
}