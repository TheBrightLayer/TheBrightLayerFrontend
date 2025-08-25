import React, { useMemo, useState, useCallback } from "react";
import {
  createEditor,
  Editor,
  Transforms,
  Element as SlateElement,
  Range,
} from "slate";
import type { Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import "../styles/CreateBlog.css"; // keep your styles together

// ---------- Config ----------
const CATEGORIES = [
  "Technology",
  "Cricket",
  "Movies",
  "Politics",
  "Business",
  "Lifestyle",
];

const INITIAL_VALUE: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Start writing your awesome blog here..." }],
  },
];

// ---------- Mark helpers ----------
type Mark = "bold" | "italic" | "underline" | "code";

const isMarkActive = (editor: Editor, format: Mark) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: Mark) => {
  const active = isMarkActive(editor, format);
  if (active) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};

// ---------- Block helpers ----------
type Block =
  | "paragraph"
  | "heading-one"
  | "heading-two"
  | "block-quote"
  | "bulleted-list"
  | "numbered-list"
  | "list-item"
  | "link"
  | "image";

const LIST_TYPES: Block[] = ["bulleted-list", "numbered-list"];

const isBlockActive = (editor: Editor, format: Block) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === format,
  });
  return !!match;
};

const toggleBlock = (editor: Editor, format: Block) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as any).type),
    split: true,
  });

  const newType: Block = isActive ? "paragraph" : isList ? "list-item" : format;
  Transforms.setNodes(editor, { type: newType } as any);

  if (!isActive && isList) {
    const block = { type: format, children: [] } as any;
    Transforms.wrapNodes(editor, block);
  }
};

// ---------- Links ----------
const isLinkActive = (editor: Editor) =>
  !!Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === "link",
  }).next().value;

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === "link",
  });
};

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) unwrapLink(editor);

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  } as any;

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

// ---------- Images ----------
const insertImage = (editor: Editor, url: string) => {
  const image = { type: "image", url, children: [{ text: "" }] } as any;
  Transforms.insertNodes(editor, image);
};

// ---------- Renderers ----------
const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "link":
      return (
        <a {...attributes} href={element.url} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    case "image":
      return (
        <div
          {...attributes}
          contentEditable={false}
          className="create-editor-image-wrap"
        >
          <img src={element.url} alt="" className="editor-image" />
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code) children = <code className="inline-code">{children}</code>;
  return <span {...attributes}>{children}</span>;
};

// ---------- Toolbar ----------
const ToolbarButton: React.FC<{
  active?: boolean;
  title?: string;
  onMouseDown: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}> = ({ active, title, onMouseDown, children }) => (
  <button
    type="button"
    className={`create-toolbar-btn ${active ? "is-active" : ""}`}
    onMouseDown={onMouseDown}
    title={title}
  >
    {children}
  </button>
);

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <div className="create-editor-toolbar">
      <ToolbarButton
        title="Bold (Ctrl/Cmd+B)"
        active={isMarkActive(editor, "bold")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "bold");
        }}
      >
        <b>B</b>
      </ToolbarButton>
      <ToolbarButton
        title="Italic (Ctrl/Cmd+I)"
        active={isMarkActive(editor, "italic")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "italic");
        }}
      >
        <i>I</i>
      </ToolbarButton>
      <ToolbarButton
        title="Underline (Ctrl/Cmd+U)"
        active={isMarkActive(editor, "underline")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "underline");
        }}
      >
        <span style={{ textDecoration: "underline" }}>U</span>
      </ToolbarButton>
      <ToolbarButton
        title="Inline code (Ctrl/Cmd+`)"
        active={isMarkActive(editor, "code")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "code");
        }}
      >
        {"</>"}
      </ToolbarButton>

      <span className="create-toolbar-sep" />
      <ToolbarButton
        title="Heading 1"
        active={isBlockActive(editor, "heading-one")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "heading-one");
        }}
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        title="Heading 2"
        active={isBlockActive(editor, "heading-two")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "heading-two");
        }}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        title="Blockquote"
        active={isBlockActive(editor, "block-quote")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "block-quote");
        }}
      >
        ❝ ❞
      </ToolbarButton>

      <span className="create-toolbar-sep" />
      <ToolbarButton
        title="Bulleted list"
        active={isBlockActive(editor, "bulleted-list")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "bulleted-list");
        }}
      >
        • List
      </ToolbarButton>
      <ToolbarButton
        title="Numbered list"
        active={isBlockActive(editor, "numbered-list")}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "numbered-list");
        }}
      >
        1. List
      </ToolbarButton>

      <span className="create-toolbar-sep" />
      <ToolbarButton
        title="Insert link (Ctrl/Cmd+K)"
        active={isLinkActive(editor)}
        onMouseDown={(e) => {
          e.preventDefault();
          const url = window.prompt("Enter URL:");
          if (url) wrapLink(editor, url);
        }}
      >
        🔗
      </ToolbarButton>
      <ToolbarButton
        title="Insert image (URL)"
        onMouseDown={(e) => {
          e.preventDefault();
          const url = window.prompt("Enter image URL:");
          if (url) insertImage(editor, url);
        }}
      >
        🖼️
      </ToolbarButton>
    </div>
  );
};

// ---------- Main component ----------
const CreateBlog: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(INITIAL_VALUE);

  // Meta
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const addTag = useCallback(() => {
    const v = tagInput.trim();
    if (!v) return;
    setTags((t) => (t.includes(v) ? t : [...t, v]));
    setTagInput("");
  }, [tagInput]);

  const removeTag = (t: string) => setTags((all) => all.filter((x) => x !== t));

  const onCoverChange = (file: File | null) => {
    setCover(file);
    if (!file) return setCoverPreview(null);
    const reader = new FileReader();
    reader.onload = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey && !event.metaKey) return;
    switch (event.key.toLowerCase()) {
      case "b":
        event.preventDefault();
        toggleMark(editor, "bold");
        break;
      case "i":
        event.preventDefault();
        toggleMark(editor, "italic");
        break;
      case "u":
        event.preventDefault();
        toggleMark(editor, "underline");
        break;
      case "`":
        event.preventDefault();
        toggleMark(editor, "code");
        break;
      case "k":
        event.preventDefault();
        {
          const url = window.prompt("Enter URL:");
          if (url) wrapLink(editor, url);
        }
        break;
    }
  };

  // ---------- API submit ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", JSON.stringify(value));
    formData.append("tags", JSON.stringify(tags));
    if (cover) formData.append("cover", cover);

    try {
      const res = await fetch("http://localhost:5000/api/blogs/create", {
        method: "POST",
        body: formData,
        // headers: { Authorization: `Bearer ${token}` } // if auth is required
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create blog");
      }

      const data = await res.json();
      console.log("🚀 Blog created:", data);
      alert("Blog successfully created!");

      // reset form
      setTitle("");
      setCategory(CATEGORIES[0]);
      setTags([]);
      setTagInput("");
      setCover(null);
      setCoverPreview(null);
      setValue(INITIAL_VALUE);
    } catch (err: any) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog: " + err.message);
    }
  };

  return (
    <div className="create-blog-page">
      <div className="create-blog-card">
        <h1 className="create-blog-title">✍️ Create a New Blog</h1>

        <form className="create-blog-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="create-form-group">
            <label>Blog Title</label>
            <input
              type="text"
              placeholder="Enter your blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="create-form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="create-form-group">
            <label>Tags</label>
            <div className="create-tags-row">
              <input
                type="text"
                placeholder="Add a tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <button
                type="button"
                className="create-add-tag-btn"
                onClick={addTag}
              >
                + Add
              </button>
            </div>
            <div className="create-chip-container">
              {tags.map((t) => (
                <span
                  key={t}
                  className="create-chip"
                  onClick={() => removeTag(t)}
                >
                  #{t} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Cover */}
          <div className="create-form-group">
            <label>Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onCoverChange(e.target.files?.[0] || null)}
            />
            {coverPreview && (
              <div className="create-cover-preview">
                <img src={coverPreview} alt="cover preview" />
              </div>
            )}
          </div>

          {/* Editor */}
          <Slate
            editor={editor}
            initialValue={INITIAL_VALUE}
            onChange={setValue}
          >
            <Toolbar editor={editor} />
            <div className="create-editor-box">
              <Editable
                className="create-editable"
                renderElement={(p) => <Element {...p} />}
                renderLeaf={(p) => <Leaf {...p} />}
                placeholder="Write your blog content..."
                spellCheck
                onKeyDown={onKeyDown}
              />
            </div>
          </Slate>

          {/* Submit */}
          <div className="create-form-submit">
            <button type="submit">🚀 Publish Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
