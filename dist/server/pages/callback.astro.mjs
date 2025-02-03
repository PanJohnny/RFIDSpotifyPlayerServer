import { e as createComponent, f as createAstro, r as renderTemplate, i as renderComponent } from '../chunks/astro/server_Cq9lstI0.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_5JtHhAno.mjs';
import { s as spotifyApi } from '../chunks/util_CzcWxNgf.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Callback = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Callback;
  let worked = false;
  let error = "";
  await spotifyApi.authorizationCodeGrant(Astro2.url.searchParams.get("code")).then((data) => {
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi.setRefreshToken(data.body["refresh_token"]);
    worked = true;
  }, (err) => {
    error = err;
  });
  if (worked)
    return Astro2.redirect("/");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Error" }, { "default": ($$result2) => renderTemplate`${error}` })}`;
}, "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/callback.astro", undefined);

const $$file = "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/callback.astro";
const $$url = "/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Callback,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
