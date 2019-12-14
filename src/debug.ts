const separator = 0x00;

/**
 * @param key A 0-separated list of asciihex sequences
 */
export function debugRawKey(key: Uint8Array): string {
  return key.reduce((accu, byte): string => {
    if (byte === separator) {
      return accu + " /";
    } else {
      let spacer = "";
      if (accu.length) spacer = " ";
      return accu + spacer + `${String.fromCharCode(byte)}`;
    }
  }, "");
}
