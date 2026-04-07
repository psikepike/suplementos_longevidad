# Data Integrity Supplements

Use this skill when a task affects supplement data, catalog structure, slugs, categories, ASINs, or shared product sources.

Goal:
protect the single source of truth of the supplements catalog.

Audit at minimum:
- slug uniqueness
- ASIN uniqueness where applicable
- category consistency
- required field completeness
- absence of duplicated products or conflicting entries
- consistency between listing pages, product pages, and comparison pages
- consistency between data source and rendered routes

Validation evidence must include:
- exact file paths scanned
- duplicate findings or explicit absence of duplicates
- exact field names checked
- numeric search results where applicable
- concrete mismatch examples if found

Do not:
- accept duplicated slugs
- accept conflicting ASIN mappings
- assume rendered pages are correct if data source is inconsistent
- declare catalog integrity without evidence
