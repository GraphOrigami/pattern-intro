import { marked } from "marked";

export default function transformMarkdownToHtml(graph) {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const key of graph) {
        const htmlKey = key.replace(/.md$/, ".html");
        yield htmlKey;
      }
    },

    async get(key) {
      const markdownKey = key.replace(/.html$/, ".md");
      const value = await graph.get(markdownKey);
      if (value) {
        const markdown = String(value);
        const html = markdown ? await marked(markdown) : undefined;
        return html;
      } else {
        return undefined;
      }
    },
  };
}