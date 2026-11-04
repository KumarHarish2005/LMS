import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold, Italic, Strikethrough, Heading1, Heading2,
  List, ListOrdered, Quote, Undo, Redo, RemoveFormatting,
} from "lucide-react";

const RichTextEditor = ({ input = "", setInput }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: input,
    editorProps: {
      attributes: {
        class: "tiptap-content",
      },
    },
    onUpdate: ({ editor }) => {
      setInput?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && input !== editor.getHTML()) {
      editor.commands.setContent(input || "", {
        emitUpdate: false,
      });
    }
  }, [input, editor]);

  if (!editor) return null;

  const tools = [
    { icon: <Bold size={16} />, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Bold" },
    { icon: <Italic size={16} />, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Italic" },
    { icon: <Strikethrough size={16} />, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike"), label: "Strike" },
    { icon: <Heading1 size={16} />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }), label: "Heading 1" },
    { icon: <Heading2 size={16} />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "Heading 2" },
    { icon: <List size={16} />, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Bullet List" },
    { icon: <ListOrdered size={16} />, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Numbered List" },
    { icon: <Quote size={16} />, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), label: "Quote" },
  ];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100">

      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-900">
        {tools.map((tool) => (
          <button
            key={tool.label}
            type="button"
            title={tool.label}
            onClick={tool.action}
            className={`rounded-md p-2 transition-colors ${
              tool.active
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {tool.icon}
          </button>
        ))}

        <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-700" />

        <button type="button" title="Undo" disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-200 disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-700">
          <Undo size={16} />
        </button>

        <button type="button" title="Redo" disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-200 disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-700">
          <Redo size={16} />
        </button>

        <button type="button" title="Clear Formatting"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
          <RemoveFormatting size={16} />
        </button>
      </div>

      <EditorContent editor={editor} className="rich-editor p-3 sm:p-4 md:p-5" />

    </div>
  );
};

export default RichTextEditor;