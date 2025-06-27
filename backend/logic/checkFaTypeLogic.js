// Function to check FA's type
export function isDFA({ states, alphabet, transitions }) {
  for (const state of states) {
    const row = transitions[state] || {};
    // 1) every symbol must be present
    for (const sym of alphabet) {
      if (!Object.prototype.hasOwnProperty.call(row, sym)) {
        return false;
      }
      let targets = row[sym];
      // normalize single‐string → array
      if (typeof targets === "string") targets = [targets];

      // must be exactly one target
      if (!Array.isArray(targets) || targets.length !== 1) {
        return false;
      }
    }
    // 2) ε‐moves not allowed in DFA
    if (Object.prototype.hasOwnProperty.call(row, "ε")) {
      return false;
    }
  }
  return true;
}

export function checkFAType(fa) {
  return isDFA(fa) ? "DFA" : "NFA";
}
