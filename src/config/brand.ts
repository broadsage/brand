import pkg from '../../package.json';

/**
 * Broadsage Brand Release & Version Configuration
 * Sourced dynamically from root package.json to ensure single source of truth.
 */
export const BRAND_VERSION_RAW: string = pkg.version;

/**
 * Formats semantic version into concise release representation:
 * - "1.0.0" -> "v1.0"
 * - "1.2.0" -> "v1.2"
 * - "1.0.4" -> "v1.0.4" (preserves patch versions if non-zero)
 */
export function formatBrandVersion(version: string = pkg.version): string {
  const cleaned = version.replace(/^v/, '');
  const parts = cleaned.split('.');
  if (parts.length >= 3 && parts[2] === '0') {
    return `v${parts[0]}.${parts[1]}`;
  }
  return `v${cleaned}`;
}

export const BRAND_VERSION: string = formatBrandVersion(pkg.version);

/**
 * Dynamic release status badge label (e.g. "Official v1.0 Locked")
 */
export const BRAND_STATUS_LABEL: string = `Official ${BRAND_VERSION} Locked`;

/**
 * Dynamic edition year
 */
export const BRAND_EDITION_YEAR: string = new Date().getFullYear().toString();
