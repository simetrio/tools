export const Base64EncodeDecodeUtils = {
    encode: (value: string): string => encodeBase64(value),

    decode: (value: string): string => decodeBase64(value),
}

const base64Keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
function encodeBase64(value: string) {
  let output = "";
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;

  value = utf8Encode(value);

  while (i < value.length) {

    chr1 = value.charCodeAt(i++);
    chr2 = value.charCodeAt(i++);
    chr3 = value.charCodeAt(i++);

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

function decodeBase64(value: string): string {
  let output = "";
  let chr1, chr2, chr3;
  let enc1, enc2, enc3, enc4;
  let i = 0;

  value = value.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  while (i < value.length) {

    enc1 = base64Keys.indexOf(value.charAt(i++));
    enc2 = base64Keys.indexOf(value.charAt(i++));
    enc3 = base64Keys.indexOf(value.charAt(i++));
    enc4 = base64Keys.indexOf(value.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }

  output = utf8Decode(output);
  return output;
}

// private method for UTF-8 encoding
function utf8Encode(value: string): string {
    value = value.replace(/\r\n/g,"\n");
    var output = "";

    for (var n = 0; n < value.length; n++) {

      var c = value.charCodeAt(n);

      if (c < 128) {
        output += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        output += String.fromCharCode((c >> 6) | 192);
        output += String.fromCharCode((c & 63) | 128);
      }
      else {
        output += String.fromCharCode((c >> 12) | 224);
        output += String.fromCharCode(((c >> 6) & 63) | 128);
        output += String.fromCharCode((c & 63) | 128);
      }
    }

    return output;
}

function utf8Decode(value: string): string {
    let output = "";
    let i = 0;
    let c = 0, c1 = 0, c2 = 0;

    while (i < value.length) {
      c = value.charCodeAt(i);

      if (c < 128) {
        output += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c1 = value.charCodeAt(i+1);
        output += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
        i += 2;
      }
      else {
        c1 = value.charCodeAt(i+1);
        c2 = value.charCodeAt(i+2);
        output += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
        i += 3;
      }
    }

    return output;
}