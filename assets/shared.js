 /* shared.js — tiny helpers for clean URLs + consistent layout */
(function(){
  const $ = (s, r=document) => r.querySelector(s);

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
    // Keep header minimal (product nav). Add About + Contact for credibility.
    const headerExtras = trust
      .filter(x => x.href === "/about/" || x.href === "/contact/")
      .map(x => `<a href="${x.href}">${x.label}</a>`)
      .join("");

    target.innerHTML = `
      <div class="top">
        <div class="wrap">
          <a class="brand" href="/"><span class="dot"></span><span>relationship.sbs</span></a>
          <nav class="nav" aria-label="Primary">
            <a href="/#tests">Tests</a>
            <a href="/tools/text-decoder/">Text Decoder</a>
            <a href="/blog/">Guides</a>
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

    target.innerHTML = `
      <div class="wrap footer">
        <div class="row" style="justify-content:space-between;">
          <div>© ${year} relationship.sbs</div>
          <div class="row">
            <a href="/#tests">Tests</a>
            <a href="/tools/text-decoder/">Tools</a>
            <a href="/blog/red-flags-vs-boundaries/">Red flags guide</a>
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
