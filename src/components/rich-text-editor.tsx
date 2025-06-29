"use client";

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Strikethrough, Heading1, Heading2, Heading3 } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
            levels: [1, 2, 3],
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none max-w-none p-4 border border-input rounded-md min-h-[400px] bg-background',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="relative">
      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex gap-1 p-1 rounded-lg bg-card border border-border shadow-md">
          <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 1 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
           <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 2 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
           <Toggle
            size="sm"
            pressed={editor.isActive('heading', { level: 3 })}
            onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive('strike')}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </div>
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
