# Affiliate Link Audit

Use this skill when a task affects Amazon affiliate links, CTA buttons, comparison tables, product cards, or monetization paths.

Goal:
verify that affiliate monetization is technically correct, consistent, and free of revenue leaks.

Check at minimum:
- every Amazon URL uses the correct affiliate tag
- no Amazon URL is missing tag parameters
- external affiliate links use `target="_blank"`
- external affiliate links use `rel="noopener noreferrer sponsored"`
- no internal navigation uses external-link behavior incorrectly
- affiliate links are placed in the intended conversion points of the page

Validation evidence must include:
- exact affected file paths
- exact link patterns found
- explicit confirmation of compliant vs non-compliant links
- search results with numeric counts where applicable

Do not:
- assume affiliate correctness without scanning real code
- declare monetization valid without evidence
- mix affiliate validation with unrelated SEO conclusions
