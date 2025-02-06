import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DxwWTFuw.mjs';
import { manifest } from './manifest_Bt7ZSjMu.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/v1/cards/last.astro.mjs');
const _page2 = () => import('./pages/api/v1/cards/session.astro.mjs');
const _page3 = () => import('./pages/api/v1/cards/use.astro.mjs');
const _page4 = () => import('./pages/api/v1/cards.astro.mjs');
const _page5 = () => import('./pages/callback.astro.mjs');
const _page6 = () => import('./pages/write.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/v1/cards/last.js", _page1],
    ["src/pages/api/v1/cards/session.js", _page2],
    ["src/pages/api/v1/cards/use.js", _page3],
    ["src/pages/api/v1/cards/index.js", _page4],
    ["src/pages/callback.astro", _page5],
    ["src/pages/write.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/dist/client/",
    "server": "file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/dist/server/",
    "host": true,
    "port": 80,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
