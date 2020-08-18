
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

export {
    maybeSlashEnclosed,
    noMatchRegexString,
    unionReplacerFlags,
};
