# Baby Name Finder — source and editorial notes

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
