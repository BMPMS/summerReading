// svelte.config.js
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// ... (your preprocess and other settings)

	kit: {
		adapter: adapter({
			// default options are precompress: false, generate: 'emitted', fallback: 'index.html'
			pages: 'build',      // path to where the static files will be generated
			assets: 'build',     // path to where the static assets will be copied
			fallback: 'index.html', // SPA fallback for client-side routing (e.g., for 404s on refresh)
			precompress: false   // set to true to enable precompression (gzip, brotli)
		})
	}
};

export default config;
