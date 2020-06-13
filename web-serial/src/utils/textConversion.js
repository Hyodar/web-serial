
function textToBase(text, base, minLength=0) {
    return Array.from(text).map(el => {
        return ` ${el.charCodeAt(0).toString(base).padStart(minLength, "0")} `;
    }).join("");
}

const textToHex = text => textToBase(text, 16, 2);
const textToBinary = text => textToBase(text, 2, 8);

export { textToHex, textToBinary };