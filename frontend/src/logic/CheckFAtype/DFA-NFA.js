function checkFAType(fa) {
  return isDFA(fa) ? "DFA" : "NFA";
}

function isDFA(fa) {
  const { states, alphabet, transitions } = fa;
  for (let state of states) {
    for (let symbol of alphabet) {
      if (!(symbol in transitions[state])) return false;
      let targets = transitions[state][symbol];
      if (typeof targets === "string") {
        targets = [targets];
      }
      if (!Array.isArray(targets) || targets.length !== 1) return false;
    }
    if ("ε" in transitions[state]) return false;
  }
  return true;
}

const fa = {
  type: "DFA",
  name: "Binary String for Even Number",
  states: ["q0", "q1"],
  alphabet: ["0", "1"],
  transitions: {
    q0: {
      0: ["q0"],
      1: ["q1"],
    },
    q1: {
      0: ["q0"],
      1: ["q1"],
    },
  },
  startState: "q0",
  acceptStates: ["q0"],
};

console.log(checkFAType(fa)); // Output: DFA

export { checkFAType, isDFA };
