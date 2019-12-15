const separator = 0x00;

export function join(parts: readonly Uint8Array[]): Uint8Array {
  return parts.reduce((accumulator, current, index) => {
    if (index === 0) return current;
    else return new Uint8Array([...accumulator, separator, ...current]);
  }, new Uint8Array([]));
}
