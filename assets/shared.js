  /* shared.js — tiny helpers for clean URLs + consistent layout */
(function(){
  const $ = (s, r=document) => r.querySelector(s);

  function ensureIcons(){
    // Add lightweight SVG favicon + apple touch icon if missing.
    const head = document.head;
    if (!head) return;
    const hasIcon = !!document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
    if (!hasIcon){
      const icon = document.createElement('link');
      icon.setAttribute('rel', 'icon');
      icon.setAttribute('type', 'image/svg+xml');
      icon.setAttribute('href', '/assets/favicon.svg');
      head.appendChild(icon);
    }
    const hasTouch = !!document.querySelector('link[rel="apple-touch-icon"]');
    if (!hasTouch){
      const touch = document.createElement('link');
      touch.setAttribute('rel', 'apple-touch-icon');
      touch.setAttribute('href', '/assets/apple-touch-icon.svg');
      head.appendChild(touch);
    }
  }

  function ensureOrganizationSchema(){
    // Adds Organization schema (does not change page content).
    const head = document.head;
    if (!head) return;
    if (document.querySelector('script[data-org-schema="1"]')) return;

    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-org-schema', '1');
    const origin = window.location.origin;
    s.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "relationship.sbs",
      "url": origin + "/",
      "logo": origin + "/assets/logo.svg"
    });
    head.appendChild(s);
  }

  function setMeta(name, content){
    const el = document.querySelector(`meta[name="${name}"]`);
    if (el) el.setAttribute("content", content);
  }

  function setOG(prop, content){
    const el = document.querySelector(`meta[property="${prop}"]`);
    if (el) el.setAttribute("content", content);
  }

  function ensureCanonical(){
    const href = window.location.origin + window.location.pathname;
    const el = document.querySelector('link[rel="canonical"]');
    if (el) el.setAttribute("href", href);
  }

  // Centralized “trust” links for consistency across header/footer.
  function getTrustLinks(){
    return [
      { href: "/about/",   label: "About" },
      { href: "/contact/", label: "Contact" },
      { href: "/privacy/", label: "Privacy" },
      { href: "/terms/",   label: "Terms" }
    ];
  }

  function renderHeader(){
    const target = $("#siteHeader");
    if (!target) return;

    const trust = getTrustLinks();

    // Add About + Contact to header
    const headerExtras = trust
      .filter(x => x.href === "/about/" || x.href === "/contact/")
      .map(x => `<a href="${x.href}">${x.label}</a>`)
      .join("");

    target.innerHTML = `
      <div class="top">
        <div class="wrap">
          <a class="brand" href="/" aria-label="relationship.sbs home">
            <img class="logo" src="/assets/logo.svg" width="28" height="28" alt="" loading="eager" decoding="async" />
            <span class="brandText">relationship.sbs</span>
          </a>
          <nav class="nav" aria-label="Primary">
            <a href="/#tests">Tests</a>
            <a href="/tools/text-decoder/">Text Decoder</a>
            <a href="/blog/">Blog</a>
            ${headerExtras}
          </nav>
        </div>
      </div>
    `;
  }

  function renderFooter(){
    const target = $("#siteFooter");
    if (!target) return;

    const year = new Date().getFullYear();
    const trust = getTrustLinks()
      .map(x => `<a href="${x.href}">${x.label}</a>`)
      .join("");

    // مهم: خلي "Guides" تروح لأرشيف /blog/ بدل مقالة واحدة
    target.innerHTML = `
      <div class="wrap footer">
        <div class="row" style="justify-content:space-between;">
          <div>© ${year} relationship.sbs</div>
          <div class="row">
            <a href="/#tests">Tests</a>
            <a href="/tools/text-decoder/">Tools</a>
            <a href="/blog/">Blog</a>
          </div>
        </div>

        <hr />

        <div class="row" style="justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div class="row" style="gap:12px; flex-wrap:wrap;">
            ${trust}
          </div>
          <div class="small">
            Contact: <a href="mailto:info@relationship.sbs">info@relationship.sbs</a>
          </div>
        </div>

        <div class="small" style="margin-top:10px;">
          Educational content only. Not medical, legal, or professional advice.
        </div>
      </div>
    `;
  }

  function applyOGDefaults(){
    ensureCanonical();
    const url = window.location.origin + window.location.pathname;
    setOG("og:url", url);
    setOG("og:type", "website");
    setOG("og:site_name", "relationship.sbs");
  }

  // ✅ Auto-init (fixes “header/footer not showing” across the entire site)
  function init(){
    try{
      ensureIcons();
      renderHeader();
      renderFooter();
      applyOGDefaults();
      ensureOrganizationSchema();
    }catch(e){
      // Fail silently to avoid breaking pages if something is missing
      // (No console spam for production.)
    }
  }

  // Run after DOM is ready (works with `defer` scripts too)
  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }

  window.Site = {
    $,
    setMeta,
    setOG,
    ensureCanonical,
    renderHeader,
    renderFooter,
    applyOGDefaults
  };
})();
