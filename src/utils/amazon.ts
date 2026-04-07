export const DEFAULT_AMAZON_TAG = 'antigravity-21';

/**
 * Builds an explicit Amazon ES affiliation URL from a given ASIN.
 * Enforces the configured default tag centrally to prevent hardcoding across layouts.
 * 
 * @param asin Amazon Standard Identification Number (ASIN)
 * @returns Fully formatted affiliation URL
 */
export function getAmazonAffiliateUrl(asin: string): string {
  // Defensive validation in case an empty ASIN is somehow passed
  if (!asin) return '#';
  return `https://www.amazon.es/dp/${asin}?tag=${DEFAULT_AMAZON_TAG}`;
}
