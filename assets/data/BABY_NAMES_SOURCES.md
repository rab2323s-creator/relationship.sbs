# Baby Name Finder — source, provenance and quality notes

## Current catalog: 20,000 names (November 2026)

The current production-candidate release is **version 2**, supplied by \`assets/data/baby-names-20k-manifest.json\` and five deterministic 4,000-name shards (\`baby-names-20k-01.json\` through \`baby-names-20k-05.json\`), totaling **exactly 20,000 unique case-insensitive name spellings**.

- **Original 1,000 names preserved:** the earlier \`assets/data/baby-names.json\` remains unchanged as a historic archive and backwards-compatibility reference. Its etymological glosses, roots, tags and 2020 audit trail remain unchanged.
- **19,000 additional names:** the highest-count name spellings in the published US 2025 Social Security national registration data, excluding the existing 1,000 (and retaining a deterministic alphabetical tie-breaker). They are not invented strings or generated combinations.
- **Birth counts:** 19,999 names have 2025 national reported-sex counts; one preserved name absent from 2025 retains a visibly labeled 2020 fallback. Where the same spelling and reported-sex category also appears in the 2024 records, its absolute count change is shown; an absent comparison is **not interpreted as zero**.
- **Gender filter:** "girl", "boy" and "unisex" are descriptive labels derived from the available US reported-sex counts for a name spelling. They are **not** claims about individual gender identity or culturally universal conventions.
- **Meanings and linguistic origins:** **2,704/20,000 names have paired, source-attributed glosses and linguistic-root labels; 17,296 do not.** All new sourced glosses were selected verbatim (apart from whitespace cleanup) from Wiktionary-attributed \`meanings.json\`, \`native-meanings.json\` or \`extra-meanings.json\` records published in Lullabyte's research repository. Any name without both fields receives \`m:null\`, \`o:null\` and empty meaning tags. **There are no invented meanings or inferred origins.** Sourced does **not** mean individually checked by a trained etymologist.
- **Categorization:** semantic tags are assigned only when a source gloss contains matching English lexical concepts. Do not mistake untagged names for names that cannot express those concepts in other languages.
- **Privacy:** existing browser-only shortlist storage and URL-based partner comparison remain unchanged. No profile, account or remote matching database was added.
- **Accessibility and delivery:** the browser loads a small manifest and five shards in parallel, then validates row count, schema and uniqueness before showing results; it rejects partial downloads rather than presenting them as complete. The 2025 European top-ten ranking snapshots remain separate.

### Current authoritative sources and working snapshots

- US Social Security Administration: https://www.ssa.gov/oact/babynames/limits.html
- 2025 underlying text snapshot: https://github.com/moisesvasquez/us-baby-names/blob/main/data/raw/yob2025.txt
- 2024 underlying text snapshot: https://github.com/moisesvasquez/us-baby-names/blob/main/data/raw/yob2024.txt
- Original preserved 2020 text snapshot: https://github.com/hackerb9/ssa-baby-names/blob/main/raw-data/yob2020.txt
- Wiktionary (dictionary licensing and editorial histories): https://en.wiktionary.org/
- Working etymology collection: https://github.com/suhxnitiwari/baby-name-maker/tree/main/data
- Adapted source glosses and their selection in the catalog are subject to **CC BY-SA 4.0** attribution/share-alike where applicable: https://creativecommons.org/licenses/by-sa/4.0/

The US count reflects a **single spelling in a single year and reported-sex class**. Minor-sex entries may be suppressed below the SSA reporting threshold. The full 20,000-name collection is **not** the top 20,000 US names in unaltered order: it includes the preserved earlier 1,000. Nor does the catalog contain complete national frequency data for the United Kingdom, France or Germany—those geographies have separate, sourced top-ten snapshots only.

### Reproducibility, checks and known limitations

The source data used for this update was retrieved in November 2026. Selection of 19,000 new names: parse all \`yob2025.txt\` entries, group by case-insensitive display spelling, take the larger reported-sex count per name, exclude the original 1,000 names, sort by descending count with an alphabetical tie-breaker, then take the first 19,000. Two 2025 registrations under different reported-sex classifications for the same spelling count as **one** display name. The selected 19,000 have a majority-class birth count of at least seven in the 2025 dataset.

The quality gate validates five shard sizes, 20,000 unique case-insensitive spellings, positive published birth counts, consistent documented/undocumented fields, dataset provenance and key functional behavior, including all previously saved names, filters, name suggestions, safe partner-link handling and website metadata. This is a machine-checkable **integrity guarantee**, **not a guarantee that every dictionary etymology is definitive**. Full expert linguistic review of every name and manual visual QA across browsers remain out of scope for this iteration.

---

## Historical 1,000-name release and earlier field definitions (archive)

## Dataset contents

- Path: assets/data/baby-names.json
- Exactly **1,000 distinct** display names, selected from US SSA national birth records (year **2020**).
- Fields: \`n\` display spelling; \`g\` predominant 2020 US birth sex class ("boy", "girl", or "unisex" when less than 80% of birth counts were registered under a single sex); \`m\` short etymological gloss; \`o\` etymological language root; \`t\` mechanically derived meaning tags; \`r\` within-sex US 2020 rank for the predominant sex; \`c\` US births with that spelling and predominant sex in 2020; \`s\` predominant US SSA sex category ("M" or "F").
- The 1,000 are chosen from names with both a recorded birth count and a nonempty etymological gloss. They are **not** the top 1,000 names ranked by birth count. They are sorted alphabetically in the shipped JSON.
- US counts and rankings only. This edition **does not** supply UK, German, French or cross-European popularity data.

## Names and usage numbers

**US Social Security Administration**, national baby-name datasets (2020):
https://www.ssa.gov/oact/babynames/limits.html

Working snapshot used for this edition:
https://github.com/hackerb9/ssa-baby-names/blob/main/raw-data/yob2020.txt

SSA reports names with at least five births in a given year and sex category, so minority-sex counts for uncommon spellings may be suppressed. "Mostly girls", "Mostly boys", and "Unisex" reflect only available US 2020 registrations and **do not make claims about a person's gender**. Counts show the majority-sex birth count only. Values may differ by geography and date.

## Etymology and meaning

Glosses and root labels were matched by case-insensitive spelling to Wiktionary-derived entries in Lullabyte's published research data:
https://github.com/suhxnitiwari/baby-name-maker/blob/main/data/meanings.json

The dataset attributes these entries to **English Wiktionary**:
https://en.wiktionary.org/

English Wiktionary contributors' textual content is available under **CC BY-SA 4.0** (with some older content also under GFDL). Credit: Wiktionary contributors; original entry histories are available at \`https://en.wiktionary.org/wiki/NAME\` (replacing NAME with the entry's actual spelling). The short glosses, their adaptation/selection and arrangement in this collection are shared under **CC BY-SA 4.0** to the extent they derive from Wiktionary content:
https://creativecommons.org/licenses/by-sa/4.0/

Changes made: selected entries that have a 2020 US registration and a nonempty meaning and language root; trimmed whitespace; omitted overly long and markup-containing entries; tagged selected semantic concepts via a conservative lexical match. No automated rewriting or expansion of the underlying meanings. Some compound-root glosses contain plus signs (e.g. "noble + bright"); they retain the original short source representation.

Etymologies often have scholarly alternatives, and the data is not a claim about the exclusive origin of a name or a fixed personality trait. Some interpretations can be contested; check individual dictionaries or language specialists before publishing definitive articles.

## Semantic filters

Category tags (love, hope, strength, nature, light, joy, peace, wisdom, faith) are assigned by explicit whole-word/known-concept matching to the recorded English meaning. Thus an empty result for a rare category represents a sparse source set, not a claim that the concept has no other names.

## Privacy and sharing

Favorites are stored locally in the browser (if enabled), under the storage key \`relationship.sbs:baby-name-favorites:v1\`. Share links store **only selected baby-name spellings** as a URL query parameter. Anyone with a shared link can read those choices; do not use the tool to share secret information. Shared URLs are not stored by our app, but web browsers and third parties can log visited URLs. There is no authentication and no remote synchronized matching.

## Rebuild and review

Source snapshot date: November 2026. Dataset year: 2020; do not present the counts as current popularity. The 1,000-name list is static in this release. A later update should (1) record the SSA file and publication year, (2) recheck Wiktionary provenance and CC BY-SA requirements, (3) review anomalous meanings and gender assignments, and (4) run \`node --test scripts/test_baby_name_finder.mjs\`.

Attribution and licensing does not transfer ownership of SSA records or the site's original UI and code. Data compilation and adapted Wiktionary-derived glosses are available under CC BY-SA 4.0.


## 2025 popularity update (November 2026)

This release retains the original, fixed 1,000-name set and its 2020 snapshot in fields \`c\`, \`r\` and \`s\` solely for traceability. It adds \`u\` for **2025 SSA** popularity: \`u.s\` is the 2025 more-frequent SSA reported sex category; \`u.c\` the 2025 birth count for that category; \`u.r\` the corresponding 2025 position in that sex-sorted SSA listing; \`u.p\` 2024 count for the same spelling and sex category; \`u.d\` the difference 2025 minus 2024. Missing \`u\` denotes a name not present in the public 2025 file and falls back to a clearly labeled 2020 count. \`gy\` gives the year for the displayed gender-based grouping.

**Official origin of figures:** https://www.ssa.gov/oact/babynames/limits.html

**Machine-readable working snapshots:**
- 2025: https://github.com/moisesvasquez/us-baby-names/blob/main/data/raw/yob2025.txt
- 2024: https://github.com/moisesvasquez/us-baby-names/blob/main/data/raw/yob2024.txt

Counts are reported for each spelling and registered sex, not a European popularity index. Because national datasets omit very-low-count records (threshold generally five births per sex), absence cannot be interpreted as zero births. The stored \`r\` or \`u.r\` is the position in the corresponding count-ordered record list (the display does not use those values as a country ranking outside the US). \`u.d\` compares counts in the **same** SSA sex category.

### Regional top-ten snapshots

\`assets/data/baby-name-regions.json\` contains a **deliberately limited** 2025 top-ten dataset (both reported sex groups) for three distinct geographies:

| Region | Publisher and scope | Interpretation |
| --- | --- | --- |
| England and Wales (not UK-wide) | ONS https://www.ons.gov.uk/releases/babynamesinenglandandwales2025 | exact-spelling 2025 top-ten first names, no implied ranking beyond ten |
| France | INSEE https://www.insee.fr/fr/statistiques/8595099 | 2025 top-ten first names, preserved accents/spelling, rounded counts omitted here |
| Germany | GfdS https://gfds.de/die-beliebtesten-vornamen-2025/ | 2025 top-ten **first** names; select phonetic/orthographic spelling variants grouped by the publisher |

The U.S. dataset is deeper; the others are **top-ten only**. A European name without a displayed rank is outside this imported top ten, **not necessarily uncommon**. Do not describe this snapshot as all of Europe or as a complete UK, France or Germany name catalogue. Germany's Sophia/Sofia or Matheo/Mattheo/Mateo/Matteo appear as **one combined rank**, and must not be presented as separate rankings or counts. Dates reflect **2025 births reported in 2026**.

### Couple suggestions

The matching algorithm first finds the exact intersection of each partner's locally saved names. For compromise suggestions, it compares **source-derived** meaning tags, source-recorded linguistic roots, and average spelling length of each shortlist. It excludes all names already selected by either partner and applies a deterministic score to remaining candidates. Scores are solely for ordering suggestions and are **never displayed as psychological compatibility or quantified relationship success**. Neither choice nor the partner's preferences are uploaded to an application server. Shared links convey the actual selected name spellings.

### Editorial caveat

The 1,000 original dictionary glosses are source-derived and not individually language-expert verified. No name meaning was revised in this update without verifying a language-specific source. Do not imply the new popularity data independently validates etymological claims. Broader multi-country coverage and comprehensive manual etymology validation remain separate future work.
