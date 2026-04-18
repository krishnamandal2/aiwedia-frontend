"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table";
import { TableHeader } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
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
        heading: { levels: [1, 2, 3] },
        codeBlock: false, // we'll use the standalone CodeBlock extension
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: "min-w-full border-collapse border border-gray-300" },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlock.configure({
        HTMLAttributes: { class: "bg-gray-100 p-3 rounded-md font-mono text-sm" },
      }),
      HorizontalRule,
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

  // Helper to add/remove link
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // Table helpers
  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };
  const addColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const deleteColumn = () => editor.chain().focus().deleteColumn().run();
  const addRowBefore = () => editor.chain().focus().addRowBefore().run();
  const addRowAfter = () => editor.chain().focus().addRowAfter().run();
  const deleteRow = () => editor.chain().focus().deleteRow().run();
  const deleteTable = () => editor.chain().focus().deleteTable().run();

  return (
    <div className="border rounded-lg shadow-sm bg-white flex flex-col h-[600px]">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50 sticky top-0 z-20">
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 text-sm border rounded ${
            editor.isActive("heading", { level: 1 }) ? "bg-black text-white" : "bg-white"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 text-sm border rounded ${
            editor.isActive("heading", { level: 2 }) ? "bg-black text-white" : "bg-white"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-1 text-sm border rounded ${
            editor.isActive("paragraph") ? "bg-black text-white" : "bg-white"
          }`}
        >
          P
        </button>

        {/* Basic formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-sm border rounded font-bold ${
            editor.isActive("bold") ? "bg-black text-white" : "bg-white"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-sm border rounded italic ${
            editor.isActive("italic") ? "bg-black text-white" : "bg-white"
          }`}
        >
          I
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={setLink}
          className={`px-3 py-1 text-sm border rounded ${
            editor.isActive("link") ? "bg-black text-white" : "bg-white"
          }`}
        >
          🔗 Link
        </button>

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm border rounded ${
            editor.isActive("bulletList") ? "bg-black text-white" : "bg-white"
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 text-sm border rounded ${
            editor.isActive("orderedList") ? "bg-black text-white" : "bg-white"
          }`}
        >
          1. List
        </button>

        {/* Text align */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="px-3 py-1 text-sm border rounded bg-white"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="px-3 py-1 text-sm border rounded bg-white"
        >
          ↔
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="px-3 py-1 text-sm border rounded bg-white"
        >
          →
        </button>

        {/* Code block */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 text-sm border rounded ${
            editor.isActive("codeBlock") ? "bg-black text-white" : "bg-white"
          }`}
        >
          &lt;/&gt;
        </button>

        {/* Horizontal rule */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 text-sm border rounded bg-white"
        >
          ―
        </button>

        {/* Table dropdown */}
        <div className="relative group">
          <button className="px-3 py-1 text-sm border rounded bg-white">📊 Table</button>
          <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg hidden group-hover:block z-20 min-w-[160px]">
            <button onClick={insertTable} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">
              Insert Table (3x3)
            </button>
            <button onClick={addColumnBefore} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">
              Add Column Before
            </button>
            <button onClick={addColumnAfter} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">
              Add Column After
            </button>
            <button onClick={deleteColumn} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">
              Delete Column
            </button>
            <button onClick={addRowBefore} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">
              Add Row Before
            </button>
            <button onClick={addRowAfter} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">
              Add Row After
            </button>
            <button onClick={deleteRow} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100">
              Delete Row
            </button>
            <button onClick={deleteTable} className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-red-600">
              Delete Table
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content with reduced gap styling */}
     <div className="flex-1 overflow-y-auto">
  <EditorContent
    editor={editor}
    className="tiptap p-5 min-h-full outline-none
      [&_p]:mb-2
      [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-3
      [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-2
      [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2
      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3
      [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
      [&_li]:mb-0.5
      [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2
      [&_hr]:my-4
      [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded [&_pre]:text-sm
      [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded
      [&_a]:text-blue-600 [&_a]:underline
      [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
      [&_th]:border [&_th]:border-gray-300 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-100 [&_th]:font-semibold
      [&_td]:border [&_td]:border-gray-300 [&_td]:px-3 [&_td]:py-2
    "
  />
</div>
    </div>
  );
}