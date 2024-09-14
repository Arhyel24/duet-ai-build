import { marked } from "marked";

export async function checkMarks(content: string) {
  const markdownSymbolsRegex =
    /(\*\*|\*|__|_|`|~|\[\[|\]\]|\!\[|\]\(|\]\)|\!\[|\]\()/;

  if (markdownSymbolsRegex.test(content)) {
    // If Markdown is detected, use marked to convert Markdown to HTML

    return await marked.parse(content);
  } else {
    // If no Markdown is detected, return content as is
    return content;
  }
}
