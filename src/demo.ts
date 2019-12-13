import { Encoding } from "@iov/encoding";
import { lexi } from "./comparators";

const separator = 0x00;

function encodeComponet(data: Uint8Array): Uint8Array {
  const hex = Encoding.toHex(data);
  return Encoding.toAscii(hex);
}

function encodeComponents(components: readonly Uint8Array[]): Uint8Array {
  return components.map(encodeComponet).reduce((accumulator, current, index) => {
    if (index === 0) return current;
    else return new Uint8Array([...accumulator, separator, ...current]);
  }, new Uint8Array([]));
}

function decodeComponent(hexdata: Uint8Array): Uint8Array {
  return Encoding.fromHex(Encoding.fromAscii(hexdata));
}

function decodeComponents(hexdata: Uint8Array): readonly Uint8Array[] {
  const components = new Array<Uint8Array>();

  let startPos = 0;
  for (let pos = 0; ; pos++) {
    if (pos === hexdata.length) {
      components.push(hexdata.slice(startPos, pos));
      break;
    }
    if (hexdata[pos] === separator) {
      components.push(hexdata.slice(startPos, pos));
      pos++; // skip separator
      startPos = pos;
    }
  }

  // console.log(components)

  return components.map(decodeComponent);
}

const examples = [
  [new Uint8Array([0x03])],
  [new Uint8Array([0x01, 0x01]), new Uint8Array([0x01])],
  [new Uint8Array([0x01, 0x01]), new Uint8Array([0x02])],
  [new Uint8Array([0x01, 0x01]), new Uint8Array([0x03])],
  [new Uint8Array([0x01, 0x01]), new Uint8Array([0x04])],
  [new Uint8Array([0x01]), new Uint8Array([0x01])],
  [new Uint8Array([0x01]), new Uint8Array([0x02])],
  [new Uint8Array([0x01]), new Uint8Array([0x03])],
  [new Uint8Array([0x01]), new Uint8Array([0x04])],
  [new Uint8Array([0x02])],
  [new Uint8Array([0x00])],
  [new Uint8Array([0x01, 0x01])],
  [new Uint8Array([0x01, 0x02])],
  [new Uint8Array([0x01, 0x03])],
  [new Uint8Array([0x01, 0x02, 0x00])],
];

const encodedExamples = examples.map(encodeComponents);
// console.log(encodedComponents);

encodedExamples.sort(lexi);

for (const example of encodedExamples.map(decodeComponents)) {
  console.log(example);
}
