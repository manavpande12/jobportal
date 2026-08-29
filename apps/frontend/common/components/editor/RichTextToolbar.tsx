"use client";
import { Editor } from "@tiptap/react";
import { Bold, Heading1, Heading2, Highlighter, Italic, List, ListOrdered, Quote, UnderlineIcon } from "lucide-react";
import { Toggle, } from "@/common/components/ui/toggle";
import { Separator } from "@/common/components/ui/separator";

type Props = {
    editor: Editor;
};

export default function RichTextToolbar({ editor, }: Props) {
    const toolbarBtn = "cursor-pointer hover:bg-background data-[state=on]:bg-primary data-[state=on]:text-primary-foreground";
    return (
        <div
            className="sticky top-0 z-10 w-full overflow-x-scroll border-b bg-card/80 p-2 backdrop-blur flex scrollbar-none gap-1"
            style={{ WebkitOverflowScrolling: "touch" }}
        >
            <Toggle type="button" value="bold" className={toolbarBtn} data-state={editor.isActive("bold") ? "on" : "off"} onClick={() => editor.chain().focus().toggleBold().run()}>
                <Bold className="h-4 w-4" />
            </Toggle>

            <Toggle type="button" value="italic" className={toolbarBtn} data-state={editor.isActive("italic") ? "on" : "off"} onClick={() => editor.chain().focus().toggleItalic().run()}>
                <Italic className="h-4 w-4" />
            </Toggle>

            <Toggle type="button" value="underline" className={toolbarBtn} data-state={editor.isActive("underline") ? "on" : "off"} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                <UnderlineIcon className="h-4 w-4" />
            </Toggle>

            <Toggle type="button" value="highlight" className={toolbarBtn} data-state={editor.isActive("highlight") ? "on" : "off"} onClick={() => editor.chain().focus().toggleHighlight().run()}>
                <Highlighter className="h-4 w-4" />
            </Toggle>
            <Separator orientation="vertical" />

            <Toggle type="button" value="h1" className={toolbarBtn} data-state={editor.isActive("heading", { level: 1 }) ? "on" : "off"} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                <Heading1 className="h-4 w-4" />
            </Toggle>

            <Toggle type="button" value="h2" className={toolbarBtn} data-state={editor.isActive("heading", { level: 2 }) ? "on" : "off"} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                <Heading2 className="h-4 w-4" />
            </Toggle>

            <Separator orientation="vertical" />
            <Toggle type="button" value="bullet" className={toolbarBtn} data-state={editor.isActive("bulletList") ? "on" : "off"} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                <List className="h-4 w-4" />
            </Toggle>

            <Toggle type="button" value="ordered" className={toolbarBtn} data-state={editor.isActive("orderedList") ? "on" : "off"} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                <ListOrdered className="h-4 w-4" />
            </Toggle>
            <Separator orientation="vertical" />

            <Toggle type="button" value="quote" className={toolbarBtn} data-state={editor.isActive("blockquote") ? "on" : "off"} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                <Quote className="h-4 w-4" />
            </Toggle>

        </div>
    );
}