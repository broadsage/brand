import pkg from '../../package.json';

/**
 * Broadsage Brand Release & Version Configuration
 * Sourced dynamically from root package.json to ensure single source of truth.
 */
export const BRAND_VERSION_RAW: string = pkg.version;

/**
 * Formats semantic version into concise major.minor representation:
 * - "1.1.1" -> "v1.1"
 * - "1.0.0" -> "v1.0"
 * - "2.0.4" -> "v2.0"
 */
export function formatBrandVersion(version: string = pkg.version): string {
  const cleaned = version.replace(/^v/, '');
  const parts = cleaned.split('.');
  const major = parts[0] || '1';
  const minor = parts[1] || '0';
  return `v${major}.${minor}`;
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
