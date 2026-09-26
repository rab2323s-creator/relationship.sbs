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

  const SCHEMA_TEST_TOPICS = {
    "attachment-style": ["Attachment styles","Anxious attachment","Avoidant attachment","Secure attachment","Fearful-avoidant attachment"],
    "love-language": ["Love languages","Words of affirmation","Quality time","Acts of service","Physical touch","Receiving gifts"],
    "conflict-style": ["Conflict styles","Communication","Conflict repair","Compromise","Relationship communication"],
    "toxic-relationship": ["Relationship patterns","Emotional safety","Control","Blame-shifting","Conflict repair"],
    "are-you-settling": ["Relationship satisfaction","Unmet needs","Commitment","Reciprocity","Self-abandonment patterns"],
    "emotional-intimacy": ["Emotional intimacy","Vulnerability","Emotional safety","Closeness","Relationship connection"],
    "overthinking-relationship": ["Relationship overthinking","Rumination","Reassurance-seeking","Hypervigilance","Self-trust"],
    "trauma-bond": ["Trauma bonding","Push-pull relationship cycles","Intermittent reinforcement","Emotional dependence","Relationship safety"],
    "narcissistic-relationship": ["Relationship control patterns","Gaslighting-style confusion","Blame-shifting","Entitlement","Relationship repair"],
    "avoidant-texting": ["Avoidant texting patterns","Pulling away","Hot-cold communication","Texting behavior","Relationship communication"],
    "emotional-availability": ["Emotional availability","Emotional presence","Relationship repair","Consistency","Mutual closeness"],
    "what-kind-of-lover-are-you-test": ["Love personality","Romantic style","Affection","Closeness","Relationship patterns"],
    "emotional-manipulation": ["Emotional manipulation","Gaslighting-style confusion","Guilt-tripping","Boundary pressure","Control"],
    "relationship-anxiety": ["Relationship anxiety","Reassurance-seeking","Overthinking","Hypervigilance","Relationship intuition"],
    "fear-of-intimacy": ["Fear of intimacy","Emotional intimacy","Vulnerability","Attachment avoidance","Relationship closeness","Self-disclosure"],
    "emotional-detachment": ["Emotional detachment","Romantic disengagement","Emotional disconnection","Relationship withdrawal","Emotional numbness"]
  };

  const SCHEMA_TEST_LABELS = {
    "attachment-style": "Attachment Style Test",
    "love-language": "Love Language Test",
    "conflict-style": "Conflict Style Test",
    "toxic-relationship": "Toxic Relationship Test",
    "are-you-settling": "Are You Settling in Your Relationship?",
    "emotional-intimacy": "Emotional Intimacy Test",
    "overthinking-relationship": "Relationship Overthinking Test",
    "trauma-bond": "Trauma Bond Test",
    "narcissistic-relationship": "Narcissistic Relationship Test",
    "avoidant-texting": "Avoidant Texting Test",
    "emotional-availability": "Emotional Availability Test",
    "what-kind-of-lover-are-you-test": "Love Personality Test",
    "emotional-manipulation": "Emotional Manipulation Test",
    "relationship-anxiety": "Relationship Anxiety Test",
    "fear-of-intimacy": "Fear of Intimacy Test",
    "emotional-detachment": "Emotional Detachment Test"
  };

  function schemaCanonical(){
    const canonical = document.querySelector('link[rel="canonical"]');
    return canonical && canonical.href
      ? canonical.href.split("?")[0].split("#")[0]
      : window.location.origin + window.location.pathname;
  }

  function schemaDescription(){
    const meta = document.querySelector('meta[name="description"]');
    return meta ? (meta.getAttribute("content") || "").trim() : "";
  }

  function schemaPageName(){
    const h1 = document.querySelector("h1");
    if (h1 && h1.textContent.trim()) return h1.textContent.trim();
    return (document.title || "relationship.sbs")
      .replace(/\s+[—|-]\s+relationship\.sbs\s*$/i, "")
      .trim();
  }

  function schemaBreadcrumbs(path, pageName, origin){
    const items = [{ "@type":"ListItem", "position":1, "name":"Home", "item":origin + "/" }];
    const parts = path.split("/").filter(Boolean);

    if (!parts.length) return items;

    if (parts[0] === "blog"){
      items.push({ "@type":"ListItem", "position":2, "name":"Blog", "item":origin + "/blog/" });
      if (parts.length > 1){
        items.push({ "@type":"ListItem", "position":3, "name":pageName, "item":schemaCanonical() });
      }
      return items;
    }

    if (parts[0] === "tests" && parts[1]){
      const slug = parts[1];
      items.push({ "@type":"ListItem", "position":2, "name":"Tests", "item":origin + "/tests/" });
      items.push({ "@type":"ListItem", "position":3, "name":SCHEMA_TEST_LABELS[slug] || "Relationship Test", "item":origin + "/tests/" + slug + "/" });
      if (parts[2] === "results"){
        if (parts[3]){
          items.push({ "@type":"ListItem", "position":4, "name":"Results", "item":origin + "/tests/" + slug + "/results/" });
          items.push({ "@type":"ListItem", "position":5, "name":pageName, "item":schemaCanonical() });
        }else{
          items.push({ "@type":"ListItem", "position":4, "name":"Results", "item":schemaCanonical() });
        }
      }
      return items;
    }

    if (parts[0] === "about" && parts[1]){
      items.push({ "@type":"ListItem", "position":2, "name":"About", "item":origin + "/about/" });
      items.push({ "@type":"ListItem", "position":3, "name":pageName, "item":schemaCanonical() });
      return items;
    }

    items.push({ "@type":"ListItem", "position":2, "name":pageName, "item":schemaCanonical() });
    return items;
  }

  function ensureEntitySchema(){
    const head = document.head;
    if (!head || document.querySelector('script[data-site-entity-schema="1"]')) return;

    const origin = window.location.origin;
    const path = window.location.pathname.replace(/\/{2,}/g, "/");
    const canonical = schemaCanonical();
    const pageName = schemaPageName();
    const description = schemaDescription();
    const lang = (document.documentElement.getAttribute("lang") || "en").trim();
    const siteId = origin + "/#website";
    const orgId = origin + "/#org";
    const logoId = origin + "/#logo";
    const personId = origin + "/about/laura-aram-smith/#person";
    const profileUrl = origin + "/about/laura-aram-smith/";
    const pageId = canonical + "#webpage";
    const breadcrumbId = canonical + "#breadcrumbs";

    const graph = [
      {
        "@type":"WebSite",
        "@id":siteId,
        "name":"relationship.sbs",
        "url":origin + "/",
        "publisher":{"@id":orgId},
        "inLanguage":"en"
      },
      {
        "@type":"Organization",
        "@id":orgId,
        "name":"relationship.sbs",
        "url":origin + "/",
        "logo":{"@id":logoId},
        "founder":{"@id":personId},
        "contactPoint":[{
          "@type":"ContactPoint",
          "contactType":"editorial",
          "email":"info@relationship.sbs",
          "availableLanguage":["en","ar"]
        }]
      },
      {
        "@type":"ImageObject",
        "@id":logoId,
        "url":origin + "/assets/logo.svg",
        "contentUrl":origin + "/assets/logo.svg",
        "width":128,
        "height":128
      },
      {
        "@type":"Person",
        "@id":personId,
        "name":"Laura Aram Smith",
        "jobTitle":"Psychologist",
        "url":profileUrl,
        "worksFor":{"@id":orgId},
        "sameAs":["https://www.facebook.com/lauraaramsmith"]
      }
    ];

    let pageType = "WebPage";
    if (path === "/about/") pageType = "AboutPage";
    else if (path === "/about/laura-aram-smith/") pageType = "ProfilePage";
    else if (path === "/contact/") pageType = "ContactPage";
    else if (path === "/blog/" || path === "/tests/" || /\/tests\/[^/]+\/results\/$/.test(path)) pageType = "CollectionPage";

    const hasExistingBreadcrumbSchema = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    ).some(el => /"@type"\s*:\s*"BreadcrumbList"/.test(el.textContent || ""));

    const page = {
      "@type":pageType,
      "@id":pageId,
      "url":canonical,
      "name":pageName,
      "inLanguage":lang,
      "isAccessibleForFree":true,
      "isPartOf":{"@id":siteId},
      "publisher":{"@id":orgId}
    };
    if (path !== "/" && !hasExistingBreadcrumbSchema){
      page.breadcrumb = {"@id":breadcrumbId};
    }
    if (description) page.description = description;

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && ogImage.content){
      page.primaryImageOfPage = {
        "@type":"ImageObject",
        "url":ogImage.content
      };
    }

    if (path === "/"){
      page.about = ["Relationship education","Communication","Attachment patterns","Healthy boundaries","Conflict repair"]
        .map(name => ({ "@type":"Thing", "name":name }));
    }

    if (path === "/about/"){
      page.about = {"@id":orgId};
    }

    if (path === "/about/laura-aram-smith/"){
      page.mainEntity = {"@id":personId};
    }

    const testMatch = path.match(/^\/tests\/([^/]+)\//);
    if (testMatch && SCHEMA_TEST_TOPICS[testMatch[1]]){
      const slug = testMatch[1];
      const topics = SCHEMA_TEST_TOPICS[slug];
      page.about = topics.map(name => ({ "@type":"Thing", "name":name }));
      page.keywords = topics.join(", ");
      page.audience = {
        "@type":"PeopleAudience",
        "audienceType":"People seeking educational relationship self-reflection"
      };
      page.educationalUse = "Self-reflection and relationship education";

      if (/\/results\//.test(path)){
        const parentTestUrl = origin + "/tests/" + slug + "/";
        page.relatedLink = [parentTestUrl];
      }
    }

    if (path === "/tools/text-decoder/"){
      const appId = canonical + "#app";
      page.mainEntity = {"@id":appId};
      graph.push({
        "@type":"WebApplication",
        "@id":appId,
        "name":pageName,
        "url":canonical,
        "applicationCategory":"LifestyleApplication",
        "operatingSystem":"Any",
        "isAccessibleForFree":true,
        "description":description || "A free relationship text-message interpretation and reply-planning tool.",
        "publisher":{"@id":orgId}
      });
    }

    graph.push(page);
    if (path !== "/" && !hasExistingBreadcrumbSchema){
      graph.push({
        "@type":"BreadcrumbList",
        "@id":breadcrumbId,
        "itemListElement":schemaBreadcrumbs(path, pageName, origin)
      });
    }

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-site-entity-schema", "1");
    s.textContent = JSON.stringify({
      "@context":"https://schema.org",
      "@graph":graph
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
      { href: "/about/",       label: "About" },
      { href: "/methodology/", label: "Methodology" },
      { href: "/contact/",     label: "Contact" },
      { href: "/privacy/",     label: "Privacy" },
      { href: "/terms/",       label: "Terms" }
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
            <a href="/tests/">Tests</a>
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
            <a href="/tests/">Tests</a>
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
      ensureEntitySchema();
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
    applyOGDefaults,
    ensureEntitySchema
  };
})();
