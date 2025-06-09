import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			pages: 'build',      // Output to 'build' directory (GitHub Pages expects this by default)
			assets: 'build'
		}),
		paths: {
			base: '/summerReading' // IMPORTANT: Set this to your repo name
		},
		appDir: 'summerReading', // Optional: rename _app to app
		prerender: {
			entries: ['*']
		}
	}
};
