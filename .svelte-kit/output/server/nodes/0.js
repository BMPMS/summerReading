import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["summerReading/immutable/nodes/0.BDwh2p73.js","summerReading/immutable/chunks/D2ejFbqw.js","summerReading/immutable/chunks/CJsu0oF3.js","summerReading/immutable/chunks/BsMAxyDu.js"];
export const stylesheets = ["summerReading/immutable/assets/0.zyvHb9E2.css"];
export const fonts = ["summerReading/immutable/assets/figtree-latin-ext-400-normal.CXAzuTZb.woff2","summerReading/immutable/assets/figtree-latin-ext-400-normal.Gbh-3PTk.woff","summerReading/immutable/assets/figtree-latin-400-normal.g7Dtegnw.woff2","summerReading/immutable/assets/figtree-latin-400-normal.BD4aNku5.woff"];
