import { toAsciihex, fromAsciihex } from "./asciihex";

function range(start: number, count: number): readonly number[] {
  return Array.from(
    {
      length: count,
    },
    (_, i) => start + i,
  );
}

export const [x0, x1, x2, x3, x4, x5, x6, x7, x8, x9] = range(48, 10);
export const [xA, xB, xC, xD, xE, xF] = range(65, 6);
export const [xa, xb, xc, xd, xe, xf] = range(97, 6);

describe("toAsciihex", () => {
  it("works", () => {
    // empty
    expect(toAsciihex(new Uint8Array([]))).toEqual(new Uint8Array([]));

    // numbers
    expect(toAsciihex(new Uint8Array([0x00]))).toEqual(new Uint8Array([x0, x0]));
    expect(toAsciihex(new Uint8Array([0x01]))).toEqual(new Uint8Array([x0, x1]));
    expect(toAsciihex(new Uint8Array([0x10]))).toEqual(new Uint8Array([x1, x0]));
    expect(toAsciihex(new Uint8Array([0x11]))).toEqual(new Uint8Array([x1, x1]));

    // letters
    expect(toAsciihex(new Uint8Array([0x1b]))).toEqual(new Uint8Array([x1, xb]));
    expect(toAsciihex(new Uint8Array([0xb1]))).toEqual(new Uint8Array([xb, x1]));
    expect(toAsciihex(new Uint8Array([0xfa]))).toEqual(new Uint8Array([xf, xa]));
    expect(toAsciihex(new Uint8Array([0xff]))).toEqual(new Uint8Array([xf, xf]));

    // multiple
    expect(toAsciihex(new Uint8Array([0x12, 0x34]))).toEqual(new Uint8Array([x1, x2, x3, x4]));
    expect(toAsciihex(new Uint8Array([0xa0, 0x0a]))).toEqual(new Uint8Array([xa, x0, x0, xa]));
  });
});

describe("fromAsciihex", () => {
  it("works for valid asciihex", () => {
    // empty
    expect(fromAsciihex(new Uint8Array([]))).toEqual(new Uint8Array([]));

    // numbers
    expect(fromAsciihex(new Uint8Array([x0, x0]))).toEqual(new Uint8Array([0x00]));
    expect(fromAsciihex(new Uint8Array([x0, x1]))).toEqual(new Uint8Array([0x01]));
    expect(fromAsciihex(new Uint8Array([x1, x0]))).toEqual(new Uint8Array([0x10]));
    expect(fromAsciihex(new Uint8Array([x1, x1]))).toEqual(new Uint8Array([0x11]));

    // letters
    expect(fromAsciihex(new Uint8Array([x1, xb]))).toEqual(new Uint8Array([0x1b]));
    expect(fromAsciihex(new Uint8Array([xb, x1]))).toEqual(new Uint8Array([0xb1]));
    expect(fromAsciihex(new Uint8Array([xf, xa]))).toEqual(new Uint8Array([0xfa]));
    expect(fromAsciihex(new Uint8Array([xf, xf]))).toEqual(new Uint8Array([0xff]));
  });

  it("throws for invalid asciihex", () => {
    // invalid number of chars
    expect(() => fromAsciihex(new Uint8Array([x1]))).toThrowError(/multiple of 2/);
    expect(() => fromAsciihex(new Uint8Array([x1, x1, x1]))).toThrowError(/multiple of 2/);

    // invalid chars
    expect(() => fromAsciihex(new Uint8Array([x1, x0 - 1]))).toThrowError(/invalid character/);
    expect(() => fromAsciihex(new Uint8Array([x1, x9 + 1]))).toThrowError(/invalid character/);
    expect(() => fromAsciihex(new Uint8Array([x1, xa - 1]))).toThrowError(/invalid character/);
    expect(() => fromAsciihex(new Uint8Array([x1, xf + 1]))).toThrowError(/invalid character/);

    // upper case hex chars
    expect(() => fromAsciihex(new Uint8Array([x1, 65]))).toThrowError(/invalid character/);
  });
});
