import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: 'replace-john-for-bob',

      transformIndexHtml(html, { path }) {
        html = html.replaceAll('john', 'bob');
        return html;
      },
    }
  ],
});
