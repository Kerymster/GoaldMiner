import { useDebounce } from 'use-debounce'

const DEFAULT_DELAY_MS = 300

/**
 * Debounced, trimmed search string for API / filter calls.
 * Uses [use-debounce](https://github.com/xnimorz/use-debounce).
 */
export function useDebouncedSearchQuery(
  raw: string,
  delayMs: number = DEFAULT_DELAY_MS,
): string {
  const [debounced] = useDebounce(raw.trim(), delayMs)
  return debounced
}
