
const validFlags = "gimusy"
const unionReplacerFlags = "gms";
const noMatchRegexString = "a^";

function maybeSlashEnclosed(str) {
    const firstSlashPos = str.indexOf("/");
    const lastSlashPos = str.lastIndexOf("/");

    return firstSlashPos !== -1 
        && lastSlashPos !== -1
        && firstSlashPos !== lastSlashPos
        && (str.length - lastSlashPos - 1) <= validFlags.length;
}

function removeFlags(str) {
    return str.split("/").slice(1, -1).join("/");
}

function splitRegexString(str) {
    const splittedStr = str.split("/").slice(1);

    return [splittedStr.slice(0, -1).join("/"), splittedStr[splittedStr.length - 1]];
}

export {
    maybeSlashEnclosed,
    noMatchRegexString,
    unionReplacerFlags,
    removeFlags,
    splitRegexString,
};
