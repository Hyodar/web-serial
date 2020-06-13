
function textToBase(text, base, minLength=0) {
    return Array.from(text).map(el => {
        return ` ${el.charCodeAt(0).toString(base).padStart(minLength, "0")} `;
    }).join("");
}

const asciiPrintableRegex = /^[ -~]+$/;

function putSquareOnNonPrintables(text) {
    return Array.from(text).map(el => {
        return (asciiPrintableRegex.test(el))? el : "\u{25a1}";
    }).join("");
}

const textToHex = text => textToBase(text, 16, 2);
const textToBinary = text => textToBase(text, 2, 8);

export { putSquareOnNonPrintables, textToHex, textToBinary };
