// assets/blog-index.js
(function () {
  "use strict";

  const POSTS_PER_PAGE = 12;

  const els = {};
  function $(id) {
    return document.getElementById(id);
  }

  function normalize(str) {
    return (str || "").toString().trim().toLowerCase();
  }

  function fmtDate(d) {
    try {
      const date = new Date(d);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return d;
    }
  }

  function unique(arr) {
    return [...new Set(arr)].filter(Boolean);
  }

  function getParams() {
    const p = new URLSearchParams(location.search);
    return {
      q: p.get("q") || "",
      tag: p.get("tag") || "",
      category: p.get("category") || "",
      sort: p.get("sort") || "newest",
      page: parseInt(p.get("page") || "1", 10) || 1,
    };
  }

  function setParams(next) {
    const p = new URLSearchParams(location.search);

    Object.entries(next).forEach(([k, v]) => {
      if (v === "" || v == null) p.delete(k);
      else p.set(k, String(v));
    });

    const qs = p.toString();
    const url = qs ? `${location.pathname}?${qs}` : `${location.pathname}`;
    history.replaceState({}, "", url);
  }

  function matches(post, state) {
    const q = normalize(state.q);
    const tag = normalize(state.tag);
    const cat = normalize(state.category);

    if (cat && normalize(post.category) !== cat) return false;
    if (tag && !(post.tags || []).some((t) => normalize(t) === tag)) return false;

    if (!q) return true;

    const hay = normalize(
      [post.title, post.excerpt, post.category, ...(post.tags || [])].join(" ")
    );
    return hay.includes(q);
  }

  function sortPosts(list, sortKey) {
    const arr = [...list];

    if (sortKey === "newest") {
      arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortKey === "oldest") {
      arr.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortKey === "readTime") {
      arr.sort((a, b) => (a.readingMinutes || 0) - (b.readingMinutes || 0));
    } else if (sortKey === "title") {
      arr.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", "en", { sensitivity: "base" })
      );
    }

    return arr;
  }

  function renderFeatured(posts) {
    const root = els.featuredArea;
    root.innerHTML = "";

    const featured = posts.filter((p) => p.featured).slice(0, 2);
    if (!featured.length) return;

    featured.forEach((p) => {
      const a = document.createElement("a");
      a.href = `/blog/${p.slug}/`;
      a.className = "featured-card";
      a.style.textDecoration = "none";
      a.style.color = "inherit";

      const img = document.createElement("img");
      img.className = "post-cover";
      img.src = p.cover || "/assets/img/blog/default.webp";
      img.alt = p.title || "Blog post cover";
      img.loading = "lazy";

      const content = document.createElement("div");
      content.className = "featured-content";
      content.innerHTML = `
        <div class="post-meta">
          <span>${fmtDate(p.date)}</span>
          <span>•</span>
          <span>${p.readingMinutes || 5} min read</span>
          <span>•</span>
          <span>${escapeHtml(p.category || "General")}</span>
        </div>
        <h2>${escapeHtml(p.title)}</h2>
        <p class="post-excerpt">${escapeHtml(p.excerpt || "")}</p>
        <div style="opacity:.9; font-size:13px;">Read article →</div>
      `;

      a.appendChild(img);
      a.appendChild(content);
      root.appendChild(a);
    });
  }

  function renderTags(allPosts, state) {
    const tags = unique(allPosts.flatMap((p) => p.tags || []));
    const root = els.tagsRow;

    root.innerHTML = "";
    tags.slice(0, 30).forEach((t) => {
      const btn = document.createElement("button");
      btn.className = "tag";
      btn.type = "button";
      btn.textContent = t;

      const pressed = normalize(state.tag) === normalize(t);
      btn.setAttribute("aria-pressed", pressed ? "true" : "false");

      btn.addEventListener("click", () => {
        const nextTag = pressed ? "" : t;
        setParams({ tag: nextTag, page: 1 });
        hydrateFromUrl();
      });

      root.appendChild(btn);
    });
  }

  function renderCategories(allPosts) {
    const cats = unique(allPosts.map((p) => p.category));
    const select = els.categorySelect;

    // reset except first option
    select.innerHTML = `<option value="">All categories</option>`;

    cats.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      select.appendChild(opt);
    });
  }

  function renderPosts(posts, state) {
    const grid = els.postsGrid;
    grid.innerHTML = "";

    const filtered = sortPosts(posts.filter((p) => matches(p, state)), state.sort);

    // Pagination
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
    const page = Math.min(Math.max(state.page, 1), totalPages);

    const start = (page - 1) * POSTS_PER_PAGE;
    const pageItems = filtered.slice(start, start + POSTS_PER_PAGE);

    els.emptyState.hidden = pageItems.length > 0;

    els.statsLine.textContent = total
      ? `Articles: ${total} • Page ${page} of ${totalPages}`
      : "No matching articles found.";

    pageItems.forEach((p) => {
      const card = document.createElement("article");
      card.className = "post-card";

      const coverSrc = p.cover || "/assets/img/blog/default.webp";
      const href = `/blog/${p.slug}/`;

      card.innerHTML = `
        <a href="${href}" style="text-decoration:none; color:inherit;">
          <img class="post-cover" src="${coverSrc}" alt="${escapeHtml(
        p.title
      )}" loading="lazy" />
        </a>
        <div class="post-body">
          <div class="post-meta">
            <span>${fmtDate(p.date)}</span>
            <span>•</span>
            <span>${p.readingMinutes || 5} min</span>
            <span>•</span>
            <span>${escapeHtml(p.category || "General")}</span>
          </div>

          <h3 class="post-title">
            <a href="${href}" style="text-decoration:none; color:inherit;">
              ${escapeHtml(p.title)}
            </a>
          </h3>

          <p class="post-excerpt">${escapeHtml(p.excerpt || "")}</p>

          <div class="tags" style="margin-top:auto;">
            ${(p.tags || [])
              .slice(0, 3)
              .map(
                (tag) => `
              <button type="button" class="tag" data-tag="${escapeHtml(
                tag
              )}">${escapeHtml(tag)}</button>
            `
              )
              .join("")}
          </div>
        </div>
      `;

      card.querySelectorAll("button[data-tag]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const t = btn.getAttribute("data-tag") || "";
          setParams({ tag: t, page: 1 });
          hydrateFromUrl();
        });
      });

      grid.appendChild(card);
    });

    renderPagination(totalPages, page);
  }

  function renderPagination(totalPages, page) {
    const root = els.pagination;
    root.innerHTML = "";

    if (totalPages <= 1) return;

    function addBtn(label, targetPage, disabled = false, current = false) {
      const b = document.createElement("button");
      b.className = "page-btn";
      b.type = "button";
      b.textContent = label;
      if (current) b.setAttribute("aria-current", "page");
      if (disabled) b.disabled = true;

      b.addEventListener("click", () => {
        if (disabled || current) return;
        setParams({ page: targetPage });
        hydrateFromUrl();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      root.appendChild(b);
    }

    addBtn("Prev", Math.max(1, page - 1), page === 1);

    // windowed pages
    const windowSize = 5;
    const start = Math.max(1, page - Math.floor(windowSize / 2));
    const end = Math.min(totalPages, start + windowSize - 1);

    for (let p = start; p <= end; p++) {
      addBtn(String(p), p, false, p === page);
    }

    addBtn("Next", Math.min(totalPages, page + 1), page === totalPages);
  }

  function hydrateFromUrl() {
    const state = getParams();
    const allPosts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];

    // sync UI controls
    els.qInput.value = state.q;
    els.categorySelect.value = state.category;
    els.sortSelect.value = state.sort;

    renderFeatured(allPosts);
    renderTags(allPosts, state);
    renderPosts(allPosts, state);
  }

  // ✅ HTML escape (avoid XSS)
  function escapeHtml(str) {
    return (str || "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m]));
  }

  document.addEventListener("DOMContentLoaded", () => {
    // shared header/footer injection
    if (window.injectShared) window.injectShared();

    els.featuredArea = $("featuredArea");
    els.qInput = $("qInput");
    els.categorySelect = $("categorySelect");
    els.sortSelect = $("sortSelect");
    els.clearBtn = $("clearBtn");
    els.tagsRow = $("tagsRow");
    els.postsGrid = $("postsGrid");
    els.pagination = $("pagination");
    els.emptyState = $("emptyState");
    els.statsLine = $("statsLine");

    const allPosts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
    renderCategories(allPosts);

    // events
    els.qInput.addEventListener("input", () => {
      setParams({ q: els.qInput.value, page: 1 });
      hydrateFromUrl();
    });

    els.categorySelect.addEventListener("change", () => {
      setParams({ category: els.categorySelect.value, page: 1 });
      hydrateFromUrl();
    });

    els.sortSelect.addEventListener("change", () => {
      setParams({ sort: els.sortSelect.value, page: 1 });
      hydrateFromUrl();
    });

    els.clearBtn.addEventListener("click", () => {
      history.replaceState({}, "", location.pathname);
      hydrateFromUrl();
    });

    hydrateFromUrl();
  });
})();
