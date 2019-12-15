import { debugRawKey } from "./debug";
import { x1, x2, x3, x4, xb, xf } from "./asciihex.spec";

describe("debugRawKey", () => {
  it("works", () => {
    expect(debugRawKey(new Uint8Array([]))).toEqual("");
    expect(debugRawKey(new Uint8Array([x1]))).toEqual("'1'");
    expect(debugRawKey(new Uint8Array([xf]))).toEqual("'f'");
    expect(debugRawKey(new Uint8Array([x1, x2]))).toEqual("'1' '2'");
    expect(debugRawKey(new Uint8Array([x1, x2, xf, xb]))).toEqual("'1' '2' 'f' 'b'");

    // separated
    expect(debugRawKey(new Uint8Array([x1, x2, 0, x3, x4]))).toEqual("'1' '2'  :  '3' '4'");
  });
});
