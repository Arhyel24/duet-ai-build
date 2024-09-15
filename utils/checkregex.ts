import { marked } from "marked";

export async function checkMarks(content: string) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const markdownSymbolsRegex =
    /(\*\*|\*|__|_|`|~|\[\[|\]\]|\!\[|\]\(|\]\)|\!\[|\]\()/;

  if (markdownSymbolsRegex.test(content)) {
    // If Markdown is detected, use marked to convert Markdown to HTML

    const message = marked.parse(content);
    return { message, isMarked: true, time };
  } else {
    // If no Markdown is detected, return content as is
    return { message: content, isMarked: false, time };
  }
}
