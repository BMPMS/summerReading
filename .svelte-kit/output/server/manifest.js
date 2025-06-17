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
		client: {start:"summerReading/immutable/entry/start.DUn_FEsN.js",app:"summerReading/immutable/entry/app.dSv7d1Ms.js",imports:["summerReading/immutable/entry/start.DUn_FEsN.js","summerReading/immutable/chunks/CJa2S5qi.js","summerReading/immutable/chunks/CZhZaakf.js","summerReading/immutable/chunks/FGnL2CKl.js","summerReading/immutable/entry/app.dSv7d1Ms.js","summerReading/immutable/chunks/CZhZaakf.js","summerReading/immutable/chunks/BQej_wha.js","summerReading/immutable/chunks/CNzqxiAI.js","summerReading/immutable/chunks/FGnL2CKl.js","summerReading/immutable/chunks/jmpxI5Lk.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
