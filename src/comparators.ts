export function lexi(a: Uint8Array, b: Uint8Array): -1 | 1 | 0 {
  const minLength = Math.min(a.length, b.length);
  for (let i = 0; i < minLength; i++) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
  }

  // a is a prefix of b or b is a prefix of a
  if (a.length > b.length) return 1;
  if (a.length < b.length) return -1;
  return 0;
}
