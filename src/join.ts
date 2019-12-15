const separator = 0x00;

export function join(parts: readonly Uint8Array[]): Uint8Array {
  return parts.reduce((accumulator, current, index) => {
    if (index === 0) return current;
    else return new Uint8Array([...accumulator, separator, ...current]);
  }, new Uint8Array([]));
}

export function unjoin(key: Uint8Array): readonly Uint8Array[] {
  const out = new Array<Uint8Array>();
  if (key.length === 0) return out;

  let startPos = 0;
  let pos = 0;
  for (; pos < key.length; pos++) {
    if (key[pos] === separator) {
      out.push(key.slice(startPos, pos));
      startPos = pos + 1;
    }
  }

  // the rest betwee last separator and end
  out.push(key.slice(startPos, pos));

  return out;
}
