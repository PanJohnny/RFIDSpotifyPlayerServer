import { e as createComponent, f as createAstro, r as renderTemplate, h as addAttribute, l as renderHead, n as renderSlot } from './astro/server_Cq9lstI0.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                            */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${Astro2.url.searchParams.has("redirect_reason") ? "D\u016Fvod p\u0159esm\u011Brov\xE1n\xED: " + Astro2.url.searchParams.get("redirect_reason") : ""} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/layouts/Layout.astro", undefined);

export { $$Layout as $ };
