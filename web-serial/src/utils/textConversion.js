
function charToBase(chr, base, minLength=0) {
    return `${chr.charCodeAt(0).toString(base).padStart(minLength, "0")} `;
}

const asciiPrintableRegex = /^[ -~]+$/;

const knownAsciiCodes = [
    "NUL", "SOH", "STX", "ETX",
    "EOT", "ENQ", "ACK", "BEL",
    "BS", "HT", "LF", "VT",
    "FF", "CR", "SO", "SI",
    "DLE", "DC1", "DC2", "DC3",
    "DC4", "NAK", "SYN", "ETB",
    "CAN", "EM", "SUB", "ESC",
    "FS", "GS", "RS", "US",
];

const knownAsciiCodesSuffixes = Object.freeze({
    "LF": "\n"
});

const htmlMarkedKnownAsciiCodes = Object.freeze(knownAsciiCodes.map(el => {
    return `<${el}>${knownAsciiCodesSuffixes[el] || ""}`;
}));

function knownAsciiCodeOrSquare(chr) {
    return htmlMarkedKnownAsciiCodes[chr.charCodeAt(0)] || '\u{25a1}';
}

const charOrSquare = chr => chr.match(asciiPrintableRegex)? chr : knownAsciiCodeOrSquare(chr);
const charToHex = chr => charToBase(chr, 16, 2);
const charToBinary = chr => charToBase(chr, 2, 8);

function strToBase(str, baseConversionFunction) {
    return Array.from(str).map(baseConversionFunction).join("");
}

export {
    charOrSquare,
    charToHex,
    charToBinary,
    strToBase,
};
