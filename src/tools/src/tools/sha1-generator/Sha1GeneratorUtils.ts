export const Sha1GeneratorUtils = {
    encode: (value: string): string => encodeSha1(value),
}

function encodeSha1(value: string): string {
 	let blockstart;
	let i, j;
	let W = new Array(80);
	let H0 = 0x67452301;
	let H1 = 0xEFCDAB89;
	let H2 = 0x98BADCFE;
	let H3 = 0x10325476;
	let H4 = 0xC3D2E1F0;
	let A, B, C, D, E;
	let temp;
 
	value = utf8Encode(value);
 
	const valueLength = value.length;
 
	const words: number[] = [];
	for(i = 0; i < valueLength - 3; i += 4) {
		j = (value.charCodeAt(i)<<24) | (value.charCodeAt(i+1)<<16) |
		(value.charCodeAt(i+2)<<8) | (value.charCodeAt(i+3));
		words.push(j);
	}
 
	switch(valueLength % 4) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = (value.charCodeAt(valueLength-1)<<24) | 0x0800000;
		break;
 
		case 2:
			i = (value.charCodeAt(valueLength-2)<<24) | (value.charCodeAt(valueLength-1)<<16) | 0x08000;
		break;
 
		case 3:
			i = (value.charCodeAt(valueLength-3)<<24) | (value.charCodeAt(valueLength-2)<<16) | (value.charCodeAt(valueLength-1)<<8) | 0x80;
		break;
	}
 
	words.push(i);
 
	while((words.length % 16) !== 14) words.push( 0 );
 
	words.push(valueLength>>>29);
	words.push((valueLength<<3)&0x0ffffffff);
 
	for (blockstart=0; blockstart<words.length; blockstart+=16) {
 
		for(i=0; i<16; i++) W[i] = words[blockstart+i];
		for(i=16; i<=79; i++) W[i] = rotateLeft(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for(i= 0; i<=19; i++) {
			temp = (rotateLeft(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotateLeft(B,30);
			B = A;
			A = temp;
		}
 
		for(i=20; i<=39; i++) {
			temp = (rotateLeft(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotateLeft(B,30);
			B = A;
			A = temp;
		}
 
		for(i=40; i<=59; i++) {
			temp = (rotateLeft(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotateLeft(B,30);
			B = A;
			A = temp;
		}
 
		for(i=60; i<=79; i++) {
			temp = (rotateLeft(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotateLeft(B,30);
			B = A;
			A = temp;
		}
 
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
 
	}
 
	return convertHex(H0) + convertHex(H1) + convertHex(H2) + convertHex(H3) + convertHex(H4);
}

function rotateLeft(n: number, s: number): number {
  return ( n<<s ) | (n>>>(32-s));
};

function convertHex(value: number): string {
  let str="";
  let i;
  let v;

  for(i=7; i>=0; i--) {
    v = (value>>>(i*4))&0x0f;
    str += v.toString(16);
  }
  return str;
};


function utf8Encode(value: string) {
  value = value.replace(/\r\n/g,"\n");
  let utftext = "";

  for (let n = 0; n < value.length; n++) {
    const c = value.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    }
    else if((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    }
    else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }

  return utftext;
};