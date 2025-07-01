export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "summerReading",
	appPath: "summerReading/summerReading",
	assets: new Set(["favicon.png","hereLogo.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"summerReading/immutable/entry/start.C3Sv9wnz.js",app:"summerReading/immutable/entry/app.nthYoev6.js",imports:["summerReading/immutable/entry/start.C3Sv9wnz.js","summerReading/immutable/chunks/BCGnSvwk.js","summerReading/immutable/chunks/CJsu0oF3.js","summerReading/immutable/chunks/CpLbeKXf.js","summerReading/immutable/entry/app.nthYoev6.js","summerReading/immutable/chunks/CJsu0oF3.js","summerReading/immutable/chunks/CXepd9Zv.js","summerReading/immutable/chunks/D2ejFbqw.js","summerReading/immutable/chunks/CpLbeKXf.js","summerReading/immutable/chunks/D_CXo6-R.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/summerReading/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
