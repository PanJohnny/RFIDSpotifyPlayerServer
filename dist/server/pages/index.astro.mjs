import { e as createComponent, f as createAstro, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent, k as renderScript } from '../chunks/astro/server_Cq9lstI0.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import { $ as $$Layout } from '../chunks/Layout_5JtHhAno.mjs';
import { s as spotifyApi } from '../chunks/util_CzcWxNgf.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro();
const $$Write = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Write;
  const { spotifyApi, contextMode, name, uri } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div data-astro-cid-ni5lgg5z> <button type="submit"${addAttribute("window.open('/write?uri=" + uri + "')", "onclick")} data-astro-cid-ni5lgg5z>Napsat <b data-astro-cid-ni5lgg5z>${name}</b> na kartu</button> </div> `;
}, "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/components/Write.astro", undefined);

const $$Astro$2 = createAstro();
const $$NowPlaying = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NowPlaying;
  const { spotifyApi } = Astro2.props;
  let uri;
  let context;
  await spotifyApi.getMyCurrentPlayingTrack().then(
    (data) => {
      if (data.statusCode != 200) return;
      uri = data.body.item.uri;
      context = data.body.context;
    },
    (err) => {
    }
  );
  let track;
  let img;
  let playbum;
  if (uri) {
    await spotifyApi.getTrack(uri.split(":")[2]).then(
      (data) => {
        track = data.body;
      },
      (err) => {
        console.log(err);
      }
    );
    if (track)
      img = track.album.images[2];
    if (context)
      playbum = context.type == "playlist" || context.type == "album";
  }
  return renderTemplate`${track ? renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-dtxkt5ef><h2 data-astro-cid-dtxkt5ef>Právě hraje</h2><div class="playing" data-astro-cid-dtxkt5ef><img${addAttribute(img.width, "width")}${addAttribute(img.height, "height")}${addAttribute(img.url, "src")} data-astro-cid-dtxkt5ef><div data-astro-cid-dtxkt5ef><h3 data-astro-cid-dtxkt5ef>${track.name}</h3><div data-astro-cid-dtxkt5ef>${track.artists.map((artist) => renderTemplate`<span class="artist" data-astro-cid-dtxkt5ef>${artist.name}</span>`)}</div><div data-astro-cid-dtxkt5ef>${playbum ? "Zdroj skladby: " : ""}${playbum ? renderTemplate`<a${addAttribute(context.external_urls.spotify, "href")} data-astro-cid-dtxkt5ef>${" "}${context.type}${" "}</a>` : ""}</div></div></div>${renderComponent($$result, "Write", $$Write, { "spotifyApi": spotifyApi, "contextMode": false, "name": track.name, "uri": uri, "data-astro-cid-dtxkt5ef": true })}${playbum ? renderTemplate`${renderComponent($$result, "Write", $$Write, { "spotifyApi": spotifyApi, "contextMode": true, "name": context.type, "uri": context.uri, "data-astro-cid-dtxkt5ef": true })}` : ""}</div>` : renderTemplate`<code data-astro-cid-dtxkt5ef>Nepodařilo se načíst informace o aktuální skladbě</code>`}`;
}, "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/components/NowPlaying.astro", undefined);

const $$Astro$1 = createAstro();
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Search;
  const { spotifyApi, query } = Astro2.props;
  let response;
  await spotifyApi.search(query, ["track"]).then(
    (data) => {
      response = data.body;
    },
    (err) => {
    }
  );
  return renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-otpdt6jm> ${!response ? renderTemplate`<code data-astro-cid-otpdt6jm>Nic tady není ${" (\u256F\xB0\u25A1\xB0\uFF09\u256F\uFE35 \u253B\u2501\u253B "}</code>` : renderTemplate`<table data-astro-cid-otpdt6jm> <thead data-astro-cid-otpdt6jm> <th data-astro-cid-otpdt6jm>jméno</th> <th data-astro-cid-otpdt6jm>autor</th> <th data-astro-cid-otpdt6jm>album</th> <th data-astro-cid-otpdt6jm></th></thead> ${response.tracks.items.map((track) => renderTemplate`<tr data-astro-cid-otpdt6jm> <td data-astro-cid-otpdt6jm>${track.name}</td> <td data-astro-cid-otpdt6jm> ${track.artists.map((artist) => renderTemplate`<span class="artist" data-astro-cid-otpdt6jm>${artist.name}</span>`)} </td> <td data-astro-cid-otpdt6jm>${track.album.name}</td> <td data-astro-cid-otpdt6jm> ${renderComponent($$result, "Write", $$Write, { "spotifyApi": spotifyApi, "uri": track.uri, "name": track.name, "contextMode": false, "data-astro-cid-otpdt6jm": true })} ${renderComponent($$result, "Write", $$Write, { "spotifyApi": spotifyApi, "uri": track.album.uri, "name": track.album.name, "contextMode": true, "data-astro-cid-otpdt6jm": true })} </td> </tr>`)} </table>`} </div> `;
}, "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/components/Search.astro", undefined);

function CardTable() {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ id: "", uri: "", active: false, action: "" });
  const [editing, setEditing] = useState(false);
  const refreshData = async () => {
    try {
      const res = await fetch("/api/v1/cards");
      const data = await res.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  useEffect(() => {
    refreshData();
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    if (cards.find((card) => card.id === form.id)) {
      alert("A card with this ID already exists. Please use a unique ID or edit the existing card.");
      return;
    }
    try {
      await fetch("/api/v1/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setForm({ id: "", uri: "", active: false, action: "" });
      refreshData();
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/v1/cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setEditing(false);
      setForm({ id: "", uri: "", active: false, action: "" });
      refreshData();
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    try {
      await fetch("/api/v1/cards", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      refreshData();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  const handleEdit = (card) => {
    setEditing(true);
    setForm(card);
  };
  const handleCancel = () => {
    setEditing(false);
    setForm({ id: "", uri: "", active: false, action: "" });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { children: "Karty" }),
    /* @__PURE__ */ jsxs("table", { border: "1", cellPadding: "5", cellSpacing: "0", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "ID" }),
        /* @__PURE__ */ jsx("th", { children: "URI" }),
        /* @__PURE__ */ jsx("th", { title: "Přiložena", children: "Aktivní" }),
        /* @__PURE__ */ jsx("th", { children: "Akce" }),
        /* @__PURE__ */ jsx("th", { children: "Úpravy" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        cards.map((card) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: card.id }),
          /* @__PURE__ */ jsx("td", { children: card.uri }),
          /* @__PURE__ */ jsx("td", { children: card.active ? "Yes" : "No" }),
          /* @__PURE__ */ jsx("td", { children: card.action }),
          /* @__PURE__ */ jsxs("td", { children: [
            /* @__PURE__ */ jsx("button", { onClick: () => handleEdit(card), children: "Edit" }),
            /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(card.id), children: "Delete" })
          ] })
        ] }, card.id)),
        cards.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", style: { textAlign: "center" }, children: "No cards found." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { children: editing ? "Přidej kartu" : "Uprav kartu" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: editing ? handleUpdate : handleAdd, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "id", children: "ID:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "id",
            name: "id",
            value: form.id,
            onChange: handleChange,
            placeholder: "ID",
            disabled: editing,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "uri", children: "URI:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "uri",
            name: "uri",
            value: form.uri,
            onChange: handleChange,
            placeholder: "URI",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "active", children: "Aktivní (pouze pro testování):" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: "active",
            name: "active",
            checked: form.active,
            onChange: handleChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "action", children: "Akce (play, queue, state):" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "action",
            name: "action",
            value: form.action,
            onChange: handleChange,
            placeholder: "Action",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: "1em" }, children: [
        /* @__PURE__ */ jsx("button", { type: "submit", children: editing ? "Update Card" : "Add Card" }),
        editing && /* @__PURE__ */ jsx("button", { type: "button", onClick: handleCancel, style: { marginLeft: "1em" }, children: "Cancel" })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read"
  ];
  if (!spotifyApi || !spotifyApi.getAccessToken() || Astro2.url.searchParams.get("reload") == "true")
    return Astro2.redirect(spotifyApi.createAuthorizeURL(scopes, Math.random()));
  let name;
  let error;
  await spotifyApi.getMe().then((data) => {
    name = data.body.display_name;
  }).catch(async (err) => {
    await spotifyApi.refreshAccessToken();
    error = true;
    console.log(err);
  });
  if (error) {
    return Astro2.redirect("/?reload=true");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Barborky p\u0159ehr\xE1va\u010D" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header> <h1>Barborky přehrávač</h1> ${name ? "P\u0159ihl\xE1\u0161en\xFD u\u017Eivatel: " + name : ""}
(
<a href="?reload=true">Login</a>
)
<a href="/all">Karty</a> </header> <main> ${renderComponent($$result2, "NowPlaying", $$NowPlaying, { "spotifyApi": spotifyApi })} <br> <h2>Vyhledejte skladbu</h2> <input type="search" name="search" id="search" placeholder="Zadejte název"> ${renderComponent($$result2, "Search", $$Search, { "spotifyApi": spotifyApi, "query": Astro2.url.searchParams.get("q") })} ${renderComponent($$result2, "CardTable", CardTable, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/components/CardTable.jsx", "client:component-export": "default" })} </main> ` })} ${renderScript($$result, "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/index.astro", undefined);

const $$file = "/home/panjohnny/WebstormProjects/RFIDSpotifyPlayerServer/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
