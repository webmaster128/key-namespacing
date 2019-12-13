import { Encoding } from "@iov/encoding";

export function toAsciihex(original: Uint8Array): Uint8Array {
  return Encoding.toAscii(Encoding.toHex(original));
}

export function fromAsciihex(asciihex: Uint8Array): Uint8Array {
  const hex = Encoding.fromAscii(asciihex);
  if (hex.toLowerCase() !== hex) throw new Error("invalid character: must not be uppercase");
  return Encoding.fromHex(hex);
}
