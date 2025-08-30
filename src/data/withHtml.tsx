import { jsx } from "slate-hyperscript";

const deserialize = (el: any): any => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  let children = Array.from(el.childNodes).map(deserialize).flat();

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "H1":
      return jsx("element", { type: "heading-one" }, children);
    case "H2":
      return jsx("element", { type: "heading-two" }, children);
    case "UL":
      return jsx("element", { type: "bulleted-list" }, children);
    case "OL":
      return jsx("element", { type: "numbered-list" }, children);
    case "LI":
      return jsx("element", { type: "list-item" }, children);
    case "BLOCKQUOTE":
      return jsx("element", { type: "block-quote" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    case "IMG":
      return jsx("element", { type: "image", url: el.getAttribute("src") }, [
        { text: "" },
      ]);
    case "B":
    case "STRONG":
      return children.map((child: any) => jsx("text", { bold: true }, child));
    case "I":
    case "EM":
      return children.map((child: any) => jsx("text", { italic: true }, child));
    case "U":
      return children.map((child: any) =>
        jsx("text", { underline: true }, child)
      );
    default:
      return children;
  }
};

export const withHtml = (editor: any) => {
  const { insertData, isInline } = editor;

  editor.isInline = (element: any) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertData = (data: DataTransfer) => {
    const html = data.getData("text/html");
    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parsed.body);
      editor.insertFragment(fragment);
      return;
    }
    insertData(data); // fallback
  };

  return editor;
};
