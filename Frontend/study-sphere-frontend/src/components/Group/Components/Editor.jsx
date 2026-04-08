import React, { useCallback, useState } from "react";
import "./styles.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Document from "@tiptap/extension-document";
import FileHandler from "@tiptap/extension-file-handler";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Dropcursor } from "@tiptap/extensions";
import { BulletList, OrderedList } from "@tiptap/extension-list";
import { FaListUl, FaListOl } from "react-icons/fa";
import { MdFormatQuote } from "react-icons/md";
import { IoMdLink, IoMdImage, IoMdArrowDropdown } from "react-icons/io";

const Editor = ({ content, setContent }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      Underline,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder,
      Document,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Paragraph,
      Text,
      Image.configure({
        resize: {
          enabled: true,
          directions: ["top", "bottom", "left", "right"],
          minWidth: 50,
          minHeight: 50,
          alwaysPreserveAspectRatio: true,
        },
      }),
      Dropcursor,
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
    ],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none text-gray-800 min-h-[300px]",
      },
    },
  });
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="p-4 bg-white">
      <div className="flex gap-5 pb-2 mb-3 border-b">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>

        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </button>
        <div ref={dropdownRef} className="relative inline-block">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Style
            <span className="text-sm">
              <IoMdArrowDropdown />
            </span>
          </button>
          {openMenu && (
            <div className="absolute left-0 z-50 w-40 mt-2 bg-white border rounded shadow">
              <button
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                  setOpenMenu(false);
                }}
                className="block w-full px-4 py-2 text-2xl text-left hover:bg-gray-100"
              >
                Heading 1
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                  setOpenMenu(false);
                }}
                className="block w-full px-4 py-2 text-xl text-left hover:bg-gray-100"
              >
                Heading 2
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                  setOpenMenu(false);
                }}
                className="block w-full px-4 py-2 text-lg text-left hover:bg-gray-100"
              >
                Heading 3
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 4 }).run();
                  setOpenMenu(false);
                }}
                className="block w-full px-4 py-2 text-base text-left hover:bg-gray-100"
              >
                Heading 4
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 5 }).run();
                  setOpenMenu(false);
                }}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                Heading 5
              </button>
              <button
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 6 }).run();
                  setOpenMenu(false);
                }}
                className="block w-full px-4 py-2 text-xs text-left hover:bg-gray-100"
              >
                Heading 6
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <MdFormatQuote />
        </button>
        <button onClick={addImage}>
          <IoMdImage />
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter link");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <IoMdLink />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
