"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (content: string) => void;
}

export default function BlogEditor({ value, onChange }: Props) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,

   onUpdate: ({ editor }) => {
  
  onChange(editor.getHTML());
},
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!mounted || !editor) return null;

  return (
    <div className="border rounded-lg">

      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-gray-100 flex-wrap">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 border rounded ${
            editor.isActive("heading", { level: 1 }) ? "bg-black text-white" : ""
          }`}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 border rounded ${
            editor.isActive("heading", { level: 2 }) ? "bg-black text-white" : ""
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-1 border rounded ${
            editor.isActive("paragraph") ? "bg-black text-white" : ""
          }`}
        >
          P
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 border rounded font-bold ${
            editor.isActive("bold") ? "bg-black text-white" : ""
          }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 border rounded italic ${
            editor.isActive("italic") ? "bg-black text-white" : ""
          }`}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 border rounded ${
            editor.isActive("bulletList") ? "bg-black text-white" : ""
          }`}
        >
          • List
        </button>

      </div>

      {/* Editor */}
     <EditorContent
  editor={editor}
  className="tiptap p-5 min-h-[300px] outline-none
  [&_h1]:text-3xl
  [&_h1]:font-bold
  [&_h2]:text-2xl
  [&_h2]:font-semibold
  [&_ul]:list-disc
  [&_ul]:pl-6"
/>

    </div>
  );
}