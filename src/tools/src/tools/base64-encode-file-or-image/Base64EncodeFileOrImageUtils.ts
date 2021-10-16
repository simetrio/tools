export const Base64EncodeFileOrImageUtils = {
    encode: (value: number[]): string => encodeBase64(value),
}

const base64Keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
function encodeBase64(value: number[]): string {
  let output = "";
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;

  while (i < value.length) {

    chr1 = value[i++];
    chr2 = value[i++];
    chr3 = value[i++];

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output +
      base64Keys.charAt(enc1) + base64Keys.charAt(enc2) +
      base64Keys.charAt(enc3) + base64Keys.charAt(enc4);
  }

  return output;
}