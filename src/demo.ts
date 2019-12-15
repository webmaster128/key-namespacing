import { lexi } from "./comparators";
import { toAsciihex } from "./asciihex";
import { debugRawKey } from "./debug";
import { join } from "./join";

function encodeExample(components: readonly Uint8Array[]): Uint8Array {
  return join(components.map(toAsciihex));
}

/*
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

  return components.map(fromAsciihex);
}
*/

const examples = [
  [new Uint8Array([0x03])],
  [new Uint8Array([0x01, 0x01]), new Uint8Array([0x01])],
  [new Uint8Array([0x01, 0x01]), new Uint8Array([0x02])],
  [new Uint8Array([0x01, 0x01]), new Uint8Array([0x03])],
  [new Uint8Array([0x01, 0x01]), new Uint8Array([0x04])],
  [new Uint8Array([0x01]), new Uint8Array([0x01])],
  [new Uint8Array([0x01]), new Uint8Array([0x02])],
  [new Uint8Array([0x01]), new Uint8Array([0x03])],
  [new Uint8Array([0x01]), new Uint8Array([0x03]), new Uint8Array([0x03])],
  [new Uint8Array([0x01]), new Uint8Array([0x03]), new Uint8Array([0xaa])],
  [new Uint8Array([0x01]), new Uint8Array([0x03]), new Uint8Array([0x1f])],
  [new Uint8Array([0x01]), new Uint8Array([0x04])],
  [new Uint8Array([0x02])],
  [new Uint8Array([0x00])],
  [new Uint8Array([0xff])],
  [new Uint8Array([0x00, 0xff])],
  [new Uint8Array([0x01, 0x01])],
  [new Uint8Array([0x01, 0x02])],
  [new Uint8Array([0x01, 0x03])],
  [new Uint8Array([0x01, 0x02, 0x00])],
];

const encodedExamples = examples.map(encodeExample);
// console.log(encodedComponents);

encodedExamples.sort(lexi);

//for (const example of encodedExamples.map(decodeComponents)) {
//  console.log(example.map(debugRawKey));
//}

for (const example of encodedExamples) {
  console.log(debugRawKey(example));
}
