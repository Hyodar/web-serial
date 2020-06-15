
function matchesConflict(match, match2) {
    const [lastMatch, firstMatch] = (match.index < match2.index)? [match, match2] : [match2, match];

    return firstMatch.index + firstMatch[0].length >= lastMatch.index;
}

function applyMultipleRegexes(str, regexes) {
    const matches = [];
    let match = [""];
    match.index = 0;

    regexes.forEach((el, idx) => {
        matches[idx] = [];
        let tries = 0;

        match = [""];
        match.index = 0;

        lookMatches:
        while ((match = el.expression.exec(str.slice(match.index + match[0].length)))) {

            if (!match) {
                break;
            }

            for (let i = idx - 1; i >= 0; i--) {
                if (matches[i].some((previousMatch) => matchesConflict(match, previousMatch))) {
                    continue lookMatches;
                }
            }

            if (tries === -1) {
                // this regex is looping a lot. should be wrong
                alert(`Well... some regex " ${el} " you put here seems to be in an infinite loop!
                Try changing it, please.`);

                regexes[idx] = new RegExp("^a", "gm");
                matches[idx] = [];
                break;
            }

            tries++;
            matches[idx].push({
                match: match,
                color: el.color
            });
        }
    });

    return matches.flat();
}

function isRegex(str) {
    const validFlags = "gimusy";
    const flags = str.slice(str.lastIndexOf('/') + 1);

    if (str.startsWith('/') && Array.from(flags).every(el => validFlags.includes(el)) && flags.length <= validFlags.length) {
        return flags;
    }
    
    return false;
}

export { applyMultipleRegexes, isRegex };
