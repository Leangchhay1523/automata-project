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
  id: "AY8U5D5",
  type: "NFA",
  convert: false,
  minimize: false,
  name: "String contains ab (with epsilon)",
  states: ["q0", "q1", "q2", "q3"],
  alphabet: ["a", "b", "ε"],
  transitions: {
    q0: {
      a: ["q0"],
      b: [],
      ε: ["q1"],
    },
    q1: {
      a: ["q2"],
      b: [],
      ε: [],
    },
    q2: {
      a: [],
      b: ["q3"],
      ε: [],
    },
    q3: {
      a: ["q3"],
      b: ["q3"],
      ε: [],
    },
  },
  startState: "q0",
  acceptStates: ["q3"],
};

console.log(checkFAType(fa)); // Output: DFA

export { checkFAType, isDFA };
