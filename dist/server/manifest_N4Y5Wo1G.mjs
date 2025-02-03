import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { o as decodeKey } from './chunks/astro/server_Cq9lstI0.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BtlHxRBh.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/","cacheDir":"file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/node_modules/.astro/","outDir":"file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/dist/","srcDir":"file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/","publicDir":"file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/public/","buildClientDir":"file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/dist/client/","buildServerDir":"file:///home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/v1/cards/last","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/v1\\/cards\\/last\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"v1","dynamic":false,"spread":false}],[{"content":"cards","dynamic":false,"spread":false}],[{"content":"last","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/v1/cards/last.js","pathname":"/api/v1/cards/last","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/v1/cards/session","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/v1\\/cards\\/session\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"v1","dynamic":false,"spread":false}],[{"content":"cards","dynamic":false,"spread":false}],[{"content":"session","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/v1/cards/session.js","pathname":"/api/v1/cards/session","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/v1/cards/use","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/v1\\/cards\\/use\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"v1","dynamic":false,"spread":false}],[{"content":"cards","dynamic":false,"spread":false}],[{"content":"use","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/v1/cards/use.js","pathname":"/api/v1/cards/use","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/v1/cards","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/v1\\/cards\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"v1","dynamic":false,"spread":false}],[{"content":"cards","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/v1/cards/index.js","pathname":"/api/v1/cards","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"html{font-family:system-ui,sans-serif;min-width:100vw;min-height:100vh}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}header{text-align:center}table{width:100%;border-collapse:collapse}th,td{border:1px solid black;padding:8px;text-align:left}th{background-color:#feefef}tr:nth-child(2n){background-color:#f2f2f2}tr:hover{background-color:#feefef}button{padding:5px;background-color:#feefef;border:1px solid black;cursor:pointer;border-radius:10px}button:hover{background-color:#fccfcf}button:active{background-color:#fbb}input[type=text]{padding:5px;border:1px solid black;border-radius:10px}input[type=text]:focus{border-color:#fccfcf}input[type=submit]{padding:5px;background-color:#feefef;border:1px solid black;cursor:pointer;border-radius:10px}input[type=submit]:hover{background-color:#fccfcf}input[type=submit]:active{background-color:#fbb}label{margin-right:10px}td button{margin-right:5px}input[type=checkbox]{width:20px;height:20px}input[type=checkbox]:checked{background-color:#fccfcf}form{display:flex;flex-direction:column}form>*{margin-bottom:10px}\n"}],"routeData":{"route":"/callback","isIndex":false,"type":"page","pattern":"^\\/callback\\/?$","segments":[[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/callback.astro","pathname":"/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"html{font-family:system-ui,sans-serif;min-width:100vw;min-height:100vh}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}header{text-align:center}table{width:100%;border-collapse:collapse}th,td{border:1px solid black;padding:8px;text-align:left}th{background-color:#feefef}tr:nth-child(2n){background-color:#f2f2f2}tr:hover{background-color:#feefef}button{padding:5px;background-color:#feefef;border:1px solid black;cursor:pointer;border-radius:10px}button:hover{background-color:#fccfcf}button:active{background-color:#fbb}input[type=text]{padding:5px;border:1px solid black;border-radius:10px}input[type=text]:focus{border-color:#fccfcf}input[type=submit]{padding:5px;background-color:#feefef;border:1px solid black;cursor:pointer;border-radius:10px}input[type=submit]:hover{background-color:#fccfcf}input[type=submit]:active{background-color:#fbb}label{margin-right:10px}td button{margin-right:5px}input[type=checkbox]{width:20px;height:20px}input[type=checkbox]:checked{background-color:#fccfcf}form{display:flex;flex-direction:column}form>*{margin-bottom:10px}\n.track[data-astro-cid-x63g5wzj]{display:flex;flex-direction:row}.playing[data-astro-cid-x63g5wzj]>div[data-astro-cid-x63g5wzj]{margin-left:2em}img[data-astro-cid-x63g5wzj]{border-radius:2px;display:block}.artist[data-astro-cid-x63g5wzj]:not(:last-child):after{content:\", \"}h3[data-astro-cid-x63g5wzj]{margin:0}\n"}],"routeData":{"route":"/write","isIndex":false,"type":"page","pattern":"^\\/write\\/?$","segments":[[{"content":"write","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/write.astro","pathname":"/write","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"button[data-astro-cid-ni5lgg5z]{margin-top:5px}.artist[data-astro-cid-dtxkt5ef]:not(:last-child):after{content:\", \"}img[data-astro-cid-dtxkt5ef]{border-radius:2px;display:block}.playing[data-astro-cid-dtxkt5ef]{display:flex;flex-direction:row}h3[data-astro-cid-dtxkt5ef]{margin:0}.playing[data-astro-cid-dtxkt5ef]>div[data-astro-cid-dtxkt5ef]{margin-left:2em}.container[data-astro-cid-dtxkt5ef]{margin-bottom:1em}table[data-astro-cid-otpdt6jm]{border-collapse:collapse;width:100%}td[data-astro-cid-otpdt6jm],th[data-astro-cid-otpdt6jm]{border:1px solid #dddddd;text-align:left;padding:8px}tr[data-astro-cid-otpdt6jm]:nth-child(2n){background-color:#ddd}.artist[data-astro-cid-otpdt6jm]:not(:last-child):after{content:\", \"}.container[data-astro-cid-otpdt6jm]{margin:2em 2em 2em 0}\nhtml{font-family:system-ui,sans-serif;min-width:100vw;min-height:100vh}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}header{text-align:center}table{width:100%;border-collapse:collapse}th,td{border:1px solid black;padding:8px;text-align:left}th{background-color:#feefef}tr:nth-child(2n){background-color:#f2f2f2}tr:hover{background-color:#feefef}button{padding:5px;background-color:#feefef;border:1px solid black;cursor:pointer;border-radius:10px}button:hover{background-color:#fccfcf}button:active{background-color:#fbb}input[type=text]{padding:5px;border:1px solid black;border-radius:10px}input[type=text]:focus{border-color:#fccfcf}input[type=submit]{padding:5px;background-color:#feefef;border:1px solid black;cursor:pointer;border-radius:10px}input[type=submit]:hover{background-color:#fccfcf}input[type=submit]:active{background-color:#fbb}label{margin-right:10px}td button{margin-right:5px}input[type=checkbox]{width:20px;height:20px}input[type=checkbox]:checked{background-color:#fccfcf}form{display:flex;flex-direction:column}form>*{margin-bottom:10px}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/callback.astro",{"propagation":"none","containsHead":true}],["/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/write.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/api/v1/cards/last@_@js":"pages/api/v1/cards/last.astro.mjs","\u0000@astro-page:src/pages/api/v1/cards/session@_@js":"pages/api/v1/cards/session.astro.mjs","\u0000@astro-page:src/pages/api/v1/cards/use@_@js":"pages/api/v1/cards/use.astro.mjs","\u0000@astro-page:src/pages/api/v1/cards/index@_@js":"pages/api/v1/cards.astro.mjs","\u0000@astro-page:src/pages/callback@_@astro":"pages/callback.astro.mjs","\u0000@astro-page:src/pages/write@_@astro":"pages/write.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_N4Y5Wo1G.mjs","/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_K8MKvoZW.mjs","/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/components/CardTable.jsx":"_astro/CardTable.B4vhGWRz.js","@astrojs/react/client.js":"_astro/client.D5VCDl9Y.js","/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.C2igd-yw.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.querySelector(\"#search\").addEventListener(\"keyup\",function(e){e.key===\"Enter\"&&(document.location.href=\"?q=\"+encodeURI(document.querySelector(\"#search\").value))});"]],"assets":["/favicon.svg","/_astro/CardTable.B4vhGWRz.js","/_astro/client.D5VCDl9Y.js","/_astro/index.BL7xzsR_.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"XCLkXxN/oJghPKbqeKxcRGZSX6iHoXqWPv1a12Inx3k="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
