import { join, unjoin } from "./join";

describe("join", () => {
  it("works", () => {
    // 0 elements
    expect(join([])).toEqual(new Uint8Array([]));

    // 1 element
    expect(join([new Uint8Array([])])).toEqual(new Uint8Array([]));
    expect(join([new Uint8Array([0x11])])).toEqual(new Uint8Array([0x11]));
    expect(join([new Uint8Array([0x11, 0x22])])).toEqual(new Uint8Array([0x11, 0x22]));

    // 2 elements
    expect(join([new Uint8Array([]), new Uint8Array([])])).toEqual(new Uint8Array([0x00]));
    expect(join([new Uint8Array([0x11]), new Uint8Array([0x11])])).toEqual(
      new Uint8Array([0x11, 0x00, 0x11]),
    );
    expect(join([new Uint8Array([0x11, 0x22]), new Uint8Array([0x33, 0x44])])).toEqual(
      new Uint8Array([0x11, 0x22, 0x00, 0x33, 0x44]),
    );

    // 3 elements
    expect(join([new Uint8Array([]), new Uint8Array([]), new Uint8Array([])])).toEqual(
      new Uint8Array([0x00, 0x00]),
    );
    expect(join([new Uint8Array([0x11]), new Uint8Array([0x11]), new Uint8Array([0x11])])).toEqual(
      new Uint8Array([0x11, 0x00, 0x11, 0x00, 0x11]),
    );
    expect(
      join([
        new Uint8Array([0x11, 0x22]),
        new Uint8Array([0x33, 0x44]),
        new Uint8Array([0x55, 0x66]),
      ]),
    ).toEqual(new Uint8Array([0x11, 0x22, 0x00, 0x33, 0x44, 0x00, 0x55, 0x66]));
  });
});

describe("unjoin", () => {
  it("works", () => {
    // 0 elements
    expect(unjoin(new Uint8Array([]))).toEqual([]);

    // 1 element
    // expect(unjoin(new Uint8Array([]))).toEqual([new Uint8Array([])]);
    expect(unjoin(new Uint8Array([0x11]))).toEqual([new Uint8Array([0x11])]);
    expect(unjoin(new Uint8Array([0x11, 0x22]))).toEqual([new Uint8Array([0x11, 0x22])]);

    // 2 elements
    expect(unjoin(new Uint8Array([0x00]))).toEqual([new Uint8Array([]), new Uint8Array([])]);
    expect(unjoin(new Uint8Array([0x11, 0x00, 0x11]))).toEqual([
      new Uint8Array([0x11]),
      new Uint8Array([0x11]),
    ]);
    expect(unjoin(new Uint8Array([0x11, 0x22, 0x00, 0x33, 0x44]))).toEqual([
      new Uint8Array([0x11, 0x22]),
      new Uint8Array([0x33, 0x44]),
    ]);

    // 3 elements
    expect(unjoin(new Uint8Array([0x00, 0x00]))).toEqual([
      new Uint8Array([]),
      new Uint8Array([]),
      new Uint8Array([]),
    ]);
    expect(unjoin(new Uint8Array([0x11, 0x00, 0x11, 0x00, 0x11]))).toEqual([
      new Uint8Array([0x11]),
      new Uint8Array([0x11]),
      new Uint8Array([0x11]),
    ]);
    expect(unjoin(new Uint8Array([0x11, 0x22, 0x00, 0x33, 0x44, 0x00, 0x55, 0x66]))).toEqual([
      new Uint8Array([0x11, 0x22]),
      new Uint8Array([0x33, 0x44]),
      new Uint8Array([0x55, 0x66]),
    ]);
  });
});
