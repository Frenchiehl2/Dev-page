/**
 * Images imported from src/content are emitted as build assets and the import
 * evaluates to the emitted file's URL.
 *
 * There is no global image loader in angular.json, so every image import must
 * declare its own:
 *
 *   import banner from './banner.svg' with { loader: 'file' };
 *
 * Without the attribute the build fails with "No loader is configured for
 * .svg files" — loud, not silent. These declarations only supply the type.
 */
declare module '*.svg' {
  const url: string;
  export default url;
}
declare module '*.png' {
  const url: string;
  export default url;
}
declare module '*.jpg' {
  const url: string;
  export default url;
}
declare module '*.webp' {
  const url: string;
  export default url;
}
