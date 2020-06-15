
function charToBase(chr, base, minLength=0) {
    return ` ${chr.charCodeAt(0).toString(base).padStart(minLength, "0")}`;
}

const asciiPrintableRegex = /^[ -~]+$/;

const charOrSquare = chr => chr.match(asciiPrintableRegex)? chr : '\u{25a1}';
const charToHex = chr => charToBase(chr, 16, 2);
const charToBinary = chr => charToBase(chr, 2, 8);

export { charOrSquare, charToHex, charToBinary };
