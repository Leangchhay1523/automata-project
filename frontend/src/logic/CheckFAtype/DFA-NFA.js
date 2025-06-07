import FaData from '../data/FaData.json';

function checkFAType(fa) {
    return isDFA(fa) ? "DFA" : "NFA";
}

function isDFA(fa) {
    const { states, alphabet, transitions } = fa;
    for (let state of states) {
        for (let symbol of alphabet) {
            if (!(symbol in transitions[state])) 
                return false; 
            let targets = transitions[state][symbol];
            if (typeof targets === "string") {
                targets = [targets];
            }
            if (!Array.isArray(targets) || targets.length !== 1) return false; 
        }
        if ("ε" in transitions[state]) 
            return false; 
    }
    return true;
}

FA.forEach((fa, index) => {
    console.log(`FA No.${index + 1} is a ${checkFAType(fa)}`);
});