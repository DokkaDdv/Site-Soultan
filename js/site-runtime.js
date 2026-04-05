/**
 * Remplissage des champs [data-site], galerie, JSON-LD — piloté par site-config.js
 */
function siteGet(key) {
  const c = window.SITE_CONFIG;
  if (!c || !(key in c)) return "";
  const v = c[key];
  if (v === null || v === undefined) return "";
  return typeof v === "string" ? v.trim() : v;
}

function siteIsNonEmpty(val) {
  if (val === null || val === undefined) return false;
  if (typeof val === "string") return val.trim().length > 0;
  if (Array.isArray(val)) return val.length > 0;
  return true;
}

function applySiteConfig() {
  const c = window.SITE_CONFIG;
  if (!c) return;

  document.querySelectorAll("[data-site]").forEach((el) => {
    const key = el.getAttribute("data-site");
    if (!key) return;
    const emptyLabel = el.getAttribute("data-site-empty") || "— à compléter —";
    let val = c[key];
    if (val !== null && val !== undefined && typeof val === "object") return;
    if (typeof val === "string") val = val.trim();
    if (typeof val === "number") val = String(val);
    if (!siteIsNonEmpty(val)) {
      el.textContent = emptyLabel;
      el.classList.add("site-value-empty");
    } else {
      el.textContent = String(val);
      el.classList.remove("site-value-empty");
    }
  });

  document.querySelectorAll("[data-site-href]").forEach((el) => {
    const key = el.getAttribute("data-site-href");
    if (!key || !c[key]) return;
    const val = String(c[key]).trim();
    if (val) el.setAttribute("href", val);
  });

  document.querySelectorAll("[data-site-tel-link]").forEach((el) => {
    const v = siteGet("phoneTel");
    if (v) el.setAttribute("href", `tel:${v.replace(/\s/g, "")}`);
  });

  document.querySelectorAll("[data-site-mailto-link]").forEach((el) => {
    const v = siteGet("email");
    if (v) {
      el.setAttribute("href", `mailto:${v}`);
      el.textContent = v;
    }
  });

  const ogMeta = document.querySelector('meta[property="og:image"]');
  const filename = siteGet("ogImageFilename");
  const base = siteGet("baseUrl").replace(/\/$/, "");
  if (ogMeta && filename && base) {
    ogMeta.setAttribute("content", `${base}/images/${filename.replace(/^\//, "")}`);
  }

  injectLocalBusinessSchema();
}

function injectLocalBusinessSchema() {
  const c = window.SITE_CONFIG;
  if (!c) return;

  const base = siteGet("baseUrl");
  const phone = siteGet("phoneTel");
  const email = siteGet("email");
  const siret = siteGet("siret");
  const street = siteGet("addressLine");
  const postal = siteGet("postalCode");
  const city = siteGet("city");

  const legalNm = siteGet("legalName");
  const bizNm = siteGet("businessName");
  const graph = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: bizNm || legalNm || "Soultan Maçonnerie",
    url: base || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  };
  if (legalNm) graph.legalName = legalNm;

  if (street || postal || city) {
    graph.address = {
      "@type": "PostalAddress",
      streetAddress: street || undefined,
      postalCode: postal || undefined,
      addressLocality: city || undefined,
      addressRegion: siteGet("region") || undefined,
      addressCountry: "FR",
    };
  }

  if (siret) {
    const digits = siret.replace(/\s/g, "");
    if (digits) graph.taxID = digits;
  }

  Object.keys(graph).forEach((k) => {
    if (graph[k] === undefined) delete graph[k];
  });
  if (graph.address) {
    Object.keys(graph.address).forEach((k) => {
      if (graph.address[k] === undefined) delete graph.address[k];
    });
    if (Object.keys(graph.address).length <= 1) delete graph.address;
  }

  let script = document.getElementById("schema-local-business");
  if (!script) {
    script = document.createElement("script");
    script.id = "schema-local-business";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(graph);
}

function initRealisationsGallery() {
  const c = window.SITE_CONFIG;
  const root = document.getElementById("photo-gallery");
  if (!root || !c || !Array.isArray(c.gallery) || c.gallery.length === 0) return;

  root.innerHTML = "";
  c.gallery.forEach((item, i) => {
    if (!item || !item.src) return;
    const fig = document.createElement("figure");
    fig.className = "gallery-photo";
    fig.dataset.delay = String(i * 60);
    const wrap = document.createElement("div");
    wrap.className = "gallery-photo-inner";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "Réalisation chantier";
    img.loading = "lazy";
    img.width = 800;
    img.height = 600;
    wrap.appendChild(img);
    fig.appendChild(wrap);
    if (item.caption) {
      const fc = document.createElement("figcaption");
      fc.className = "gallery-caption";
      fc.textContent = item.caption;
      fig.appendChild(fc);
    }
    root.appendChild(fig);
  });

  const note = document.querySelector(".gallery-note");
  if (note) note.style.display = "none";

  const lead = document.querySelector(".gallery-lead");
  if (lead && siteGet("galleryLeadWhenFilled")) {
    lead.textContent = siteGet("galleryLeadWhenFilled");
  }
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  const backdrop = document.getElementById("nav-backdrop");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-drawer-open", open);
    if (backdrop) {
      backdrop.classList.toggle("is-visible", open);
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(!menu.classList.contains("is-open"));
  });

  if (backdrop) {
    backdrop.addEventListener("click", () => setOpen(false));
  }

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && menu.classList.contains("is-open")) setOpen(false);
  });
}

window.applySiteConfig = applySiteConfig;
window.initRealisationsGallery = initRealisationsGallery;
window.initMobileNav = initMobileNav;
