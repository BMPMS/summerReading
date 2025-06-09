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
		client: {start:"summerReading/immutable/entry/start.cmNE_W6q.js",app:"summerReading/immutable/entry/app.Bzaiqnh1.js",imports:["summerReading/immutable/entry/start.cmNE_W6q.js","summerReading/immutable/chunks/CZHx0Q1-.js","summerReading/immutable/chunks/D9ilNhbh.js","summerReading/immutable/chunks/CEuUZKJQ.js","summerReading/immutable/entry/app.Bzaiqnh1.js","summerReading/immutable/chunks/D9ilNhbh.js","summerReading/immutable/chunks/CugmvEZG.js","summerReading/immutable/chunks/BmfI596L.js","summerReading/immutable/chunks/CEuUZKJQ.js","summerReading/immutable/chunks/ClimR6Dr.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
