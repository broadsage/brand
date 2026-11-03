import { useState, useCallback } from 'react';

export interface UseClipboardOptions {
  timeoutMs?: number;
}

/**
 * Reusable clipboard hook with auto-resetting active key.
 */
export function useClipboard({ timeoutMs = 2000 }: UseClipboardOptions = {}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback(
    (text: string, key: string) => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        return Promise.reject(new Error('Clipboard API unavailable'));
      }
      return navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => {
          setCopiedKey((current) => (current === key ? null : current));
        }, timeoutMs);
      });
    },
    [timeoutMs]
  );

  return { copiedKey, copy };
}

