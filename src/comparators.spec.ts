import { lexi } from "./comparators";

describe("lexi", () => {
  it("works for equal length", () => {
    // a < b
    expect(lexi(new Uint8Array([0x00]), new Uint8Array([0x01]))).toEqual(-1);
    expect(lexi(new Uint8Array([0x00, 0x04]), new Uint8Array([0x00, 0x05]))).toEqual(-1);
    expect(lexi(new Uint8Array([0x00, 0x04]), new Uint8Array([0x01, 0x04]))).toEqual(-1);

    // a > b
    expect(lexi(new Uint8Array([0x02]), new Uint8Array([0x01]))).toEqual(1);
    expect(lexi(new Uint8Array([0x00, 0x04]), new Uint8Array([0x00, 0x03]))).toEqual(1);
    expect(lexi(new Uint8Array([0x01, 0x04]), new Uint8Array([0x00, 0x04]))).toEqual(1);

    // a == b
    expect(lexi(new Uint8Array([]), new Uint8Array([]))).toEqual(0);
    expect(lexi(new Uint8Array([0x02]), new Uint8Array([0x02]))).toEqual(0);
    expect(lexi(new Uint8Array([0x02, 0xaa]), new Uint8Array([0x02, 0xaa]))).toEqual(0);
    expect(lexi(new Uint8Array([0x02, 0xaa, 0x7f]), new Uint8Array([0x02, 0xaa, 0x7f]))).toEqual(0);
  });

  it("works for a prefixes", () => {
    // a is prefix of b, i.e. a < b
    expect(lexi(new Uint8Array([0x04]), new Uint8Array([0x04, 0x00]))).toEqual(-1);
    expect(lexi(new Uint8Array([0x04]), new Uint8Array([0x04, 0x01]))).toEqual(-1);
    expect(lexi(new Uint8Array([0x04]), new Uint8Array([0x04, 0x02]))).toEqual(-1);
    expect(lexi(new Uint8Array([0x04]), new Uint8Array([0x04, 0xff]))).toEqual(-1);
    expect(lexi(new Uint8Array([]), new Uint8Array([0x00]))).toEqual(-1);
    expect(lexi(new Uint8Array([]), new Uint8Array([0x01]))).toEqual(-1);
    expect(lexi(new Uint8Array([]), new Uint8Array([0x02]))).toEqual(-1);
    expect(lexi(new Uint8Array([]), new Uint8Array([0xff]))).toEqual(-1);

    // b is prefix of a, i.e. b < a
    expect(lexi(new Uint8Array([0x04, 0x00]), new Uint8Array([0x04]))).toEqual(1);
    expect(lexi(new Uint8Array([0x04, 0x01]), new Uint8Array([0x04]))).toEqual(1);
    expect(lexi(new Uint8Array([0x04, 0x02]), new Uint8Array([0x04]))).toEqual(1);
    expect(lexi(new Uint8Array([0x04, 0xff]), new Uint8Array([0x04]))).toEqual(1);
    expect(lexi(new Uint8Array([0x00]), new Uint8Array([]))).toEqual(1);
    expect(lexi(new Uint8Array([0x01]), new Uint8Array([]))).toEqual(1);
    expect(lexi(new Uint8Array([0x02]), new Uint8Array([]))).toEqual(1);
    expect(lexi(new Uint8Array([0xff]), new Uint8Array([]))).toEqual(1);
  });
});
