import { unjoin } from "./join";

/**
 * @param key A 0-separated list of asciihex sequences
 */
export function debugRawKey(key: Uint8Array): string {
  return unjoin(key)
    .map(bytes => {
      return [...bytes].map(byte => `'${String.fromCharCode(byte)}'`).join(" ");
    })
    .join("  :  ");
}
