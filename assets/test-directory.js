/* Client-side filtering for the server-rendered relationship test directory. */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const field = document.getElementById("testSearch");
    const grid = document.getElementById("allTestsGrid");
    const count = document.getElementById("testCount");
    const empty = document.getElementById("testEmpty");
    if (!field || !grid || !count || !empty) return;

    const items = Array.from(grid.querySelectorAll("article.tile"));
    const search = () => {
      const term = field.value.trim().toLocaleLowerCase("en");
      let visible = 0;
      for (const item of items) {
        const matches = !term || item.textContent.toLocaleLowerCase("en").includes(term);
        item.hidden = !matches;
        if (matches) visible++;
      }
      count.textContent = visible + " of " + items.length + " tests";
      empty.hidden = visible !== 0;
    };
    field.addEventListener("input", search);
    search();
  });
})();
