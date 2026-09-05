/**
 * Markdown files are inlined as strings at build time by the `loader`
 * option in angular.json (`".md": "text"`).
 */
declare module '*.md' {
  const content: string;
  export default content;
}
