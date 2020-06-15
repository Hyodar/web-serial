
function isRegex(str) {
    const validFlags = "gimusy";
    const flags = str.slice(str.lastIndexOf('/') + 1);

    if (str.startsWith('/') && Array.from(flags).every(el => validFlags.includes(el)) && flags.length <= validFlags.length) {
        return flags;
    }
    
    return false;
}

export { isRegex };
