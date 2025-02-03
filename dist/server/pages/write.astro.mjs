import { e as createComponent, f as createAstro, r as renderTemplate, j as defineScriptVars, i as renderComponent, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_Cq9lstI0.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_5JtHhAno.mjs';
import { s as spotifyApi } from '../chunks/util_CzcWxNgf.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Write = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Write;
  const uri = Astro2.url.searchParams.get("uri");
  if (!uri)
    return Astro2.redirect(
      "/?redirect_reason=" + encodeURI("\u0161patn\xE9 argumenty pro /write")
    );
  let track;
  let album;
  let playlist;
  let playBumData;
  let succcess;
  if (uri.includes("track")) {
    await spotifyApi.getTrack(uri.split(":")[2]).then(
      (data) => {
        track = data.body;
        succcess = true;
      },
      (err) => {
      }
    );
  } else if (uri.includes("album")) {
    await spotifyApi.getAlbum(uri.split(":")[2]).then(
      (data) => {
        album = data.body;
        playBumData = album;
        succcess = true;
      },
      (err) => {
      }
    );
  } else if (uri.includes("playlist")) {
    await spotifyApi.getPlaylist(uri.split(":")[2]).then(
      (data) => {
        playlist = data.body;
        playBumData = playlist;
        succcess = true;
      },
      (err) => {
      }
    );
  }
  if (!succcess) {
    return Astro2.redirect(
      "/?reload=true&redirect_reason=" + encodeURI("access token pro\u0161el")
    );
  }
  return renderTemplate(_a || (_a = __template(["", "  <script>(function(){", '\n    const card = document.querySelector("#card");\n    const info = document.querySelector("#message");\n    const action = document.querySelector("#action");\n    const restoreSessionButton = document.querySelector("#restoreSession");\n\n    let cardId;\n    let checkCard = true;\n    function restoreSession() {\n        fetch("/api/v1/cards/session").then((success) => {\n            info.textContent = "session obnovena";\n            card.textContent = "p\u0159ilo\u017Ete kartu";\n            restoreSessionButton.disabled = true;\n            checkCard = true;\n        }, (err) => {\n            window.alert(err)\n            info.textContent = "session obnoven\xED selhalo";\n            restoreSessionButton.disabled = false;\n        });\n    }\n\n    action.addEventListener("change", submitUpdate);\n\n    restoreSession();\n\n    restoreSessionButton.addEventListener("click", restoreSession);\n\n    setInterval(() => {\n        if (!checkCard)\n            return;\n        fetch("/api/v1/cards/last")\n            .then((data) => data.json())\n            .then((json) => {\n                if (!json.data)\n                    return;\n                card.innerText = json.data.id;\n                restoreSessionButton.disabled = false;\n                checkCard = false;\n                cardId = json.data.id;\n                submitUpdate();\n            });\n    }, 1000);\n\n    function submitUpdate() {\n        // Updates the card to the new data\n        if (action.value !== "none" && cardId) {\n            // PUT /api/v1/cards\n            fetch("/api/v1/cards", {\n                method: "PUT",\n                headers: { "Content-Type": "application/json" },\n                body: JSON.stringify({\n                    id: cardId,\n                    action: action.value,\n                    uri: uri,\n                    active: true\n                }),\n            }).then((success) => {\n                info.textContent = "\xDAsp\u011B\u0161n\u011B naps\xE1no! M\u016F\u017Eete pokra\u010Dovat, klidn\u011B zm\u011Bnit akci apod.";\n            }, (err) => {\n                info.textContent = "N\u011Bco se pokazilo!";\n            });\n        }\n    }\n})();<\/script>'])), renderComponent($$result, "Layout", $$Layout, { "title": "Psan\xED na kartu", "data-astro-cid-x63g5wzj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header data-astro-cid-x63g5wzj> <a href="/" data-astro-cid-x63g5wzj>Domů</a> </header> <main data-astro-cid-x63g5wzj> <div data-astro-cid-x63g5wzj> <h2 data-astro-cid-x63g5wzj>1) Vyberte možnost</h2> <label for="action" data-astro-cid-x63g5wzj>Akce: </label><select name="action" id="action" data-astro-cid-x63g5wzj> <option value="none" data-astro-cid-x63g5wzj>--- Vyberte ---</option> <option value="play" data-astro-cid-x63g5wzj>Přehrát</option> ${!playBumData ? renderTemplate`<option value="queue" data-astro-cid-x63g5wzj>Přidat do fronty</option>` : ""} <option value="state" data-astro-cid-x63g5wzj>
Hrát/Zastavit (ignoruje výběr čehokoliv)
</option> </select> </div> <div data-astro-cid-x63g5wzj> <h2 data-astro-cid-x63g5wzj>2) Zkontrolujte informace</h2> <div class="track" data-astro-cid-x63g5wzj> ${track ? renderTemplate`<img${addAttribute(track.album.images[2].width, "width")}${addAttribute(track.album.images[2].height, "height")}${addAttribute(track.album.images[2].url, "src")} alt="Album cover" data-astro-cid-x63g5wzj>` : !playlist ? renderTemplate`<img${addAttribute(album.images[2].width, "width")}${addAttribute(album.images[2].height, "height")}${addAttribute(album.images[2].url, "src")} alt="Playlist cover" data-astro-cid-x63g5wzj>` : ""} <div data-astro-cid-x63g5wzj> <h3 data-astro-cid-x63g5wzj>${track ? track.name : playBumData.name}</h3> <div data-astro-cid-x63g5wzj> ${track ? track.artists.map((artist) => renderTemplate`<span class="artist" data-astro-cid-x63g5wzj>${artist.name}</span>`) : album ? album.artists.map((artist) => renderTemplate`<span class="artist" data-astro-cid-x63g5wzj>${artist.name}</span>`) : playlist.owner.display_name} </div> ${track ? renderTemplate`<div data-astro-cid-x63g5wzj> <a${addAttribute("?uri=" + track.album.uri, "href")} data-astro-cid-x63g5wzj> ${track.album.name} </a> </div>` : ""} </div> </div> </div> <div data-astro-cid-x63g5wzj> <h2 data-astro-cid-x63g5wzj>3) Přiložte kartu</h2> <p data-astro-cid-x63g5wzj>Přiložte kartu dokud se nezobrazí správná karta</p> <p data-astro-cid-x63g5wzj>
Číslo karty: <code id="card" data-astro-cid-x63g5wzj>přiložte kartu</code> </p> <input type="button" id="restoreSession" value="Využít jinou kartu" disabled data-astro-cid-x63g5wzj> <hr data-astro-cid-x63g5wzj> <p id="message" data-astro-cid-x63g5wzj></p> </div> </main> ` }), defineScriptVars({ uri }));
}, "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/write.astro", undefined);

const $$file = "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/write.astro";
const $$url = "/write";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Write,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
