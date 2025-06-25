import { epsilonClosure } from "../utils/epsilonClosure.js";

export default function nfaToDfa(fa) {
  const {
    name,
    type,
    states,
    alphabet,
    transitions,
    startState,
    acceptStates,
  } = fa;

  // If already a DFA, return as is
  if (type === "DFA") {
    return fa;
  }

  // Check for ε-transitions
  const hasEpsilon = alphabet.includes("ε");

  // Check for non-deterministic transitions (arrays or multiple targets)
  let isNonDeterministic = false;
  for (const state in transitions) {
    for (const symbol in transitions[state]) {
      if (Array.isArray(transitions[state][symbol])) {
        isNonDeterministic = true;
        break;
      }
    }
    if (isNonDeterministic) break;
  }

  // If no ε-transitions and deterministic, treat as DFA
  if (!hasEpsilon && !isNonDeterministic) {
    return fa;
  }

  // Determine state name prefix (e.g., 'q' from 'q0')
  const statePrefix = states[0].match(/^[a-zA-Z]+/)?.[0] || "q";

  // Initialize DFA structure
  const dfa = {
    name: `DFA_${name}`,
    type: "DFA",
    states: [],
    alphabet: alphabet.filter((symbol) => symbol !== "ε"),
    transitions: {},
    startState: "",
    acceptStates: [],
  };

  const queue = [];
  const stateSets = new Map();
  let stateCounter = 0;

  // Compute ε-closure of start state as initial DFA state
  const initialStateSet = epsilonClosure([startState], transitions);
  const initialStateName = `${statePrefix}'${stateCounter++}`;
  stateSets.set(initialStateSet.sort().join(","), initialStateName);
  dfa.states.push(initialStateName);
  dfa.startState = initialStateName;
  queue.push(initialStateSet);

  // Mark as accept if any NFA accept state is in the set
  if (initialStateSet.some((s) => acceptStates.includes(s))) {
    dfa.acceptStates.push(initialStateName);
  }

  // Subset construction
  while (queue.length > 0) {
    const currentStateSet = queue.shift();
    const currentStateName = stateSets.get(currentStateSet.sort().join(","));
    dfa.transitions[currentStateName] = {};

    for (const symbol of dfa.alphabet) {
      const nextStates = new Set();
      for (const state of currentStateSet) {
        if (transitions[state] && transitions[state][symbol]) {
          const targets = Array.isArray(transitions[state][symbol])
            ? transitions[state][symbol]
            : [transitions[state][symbol]];
          targets.forEach((t) => nextStates.add(t));
        }
      }

      // Compute ε-closure of reachable states
      const nextStateSet = epsilonClosure([...nextStates], transitions);
      if (nextStateSet.length > 0) {
        const nextStateKey = nextStateSet.sort().join(",");
        let nextStateName = stateSets.get(nextStateKey);

        if (!nextStateName) {
          nextStateName = `${statePrefix}'${stateCounter++}`;
          stateSets.set(nextStateKey, nextStateName);
          dfa.states.push(nextStateName);
          queue.push(nextStateSet);

          if (nextStateSet.some((s) => acceptStates.includes(s))) {
            dfa.acceptStates.push(nextStateName);
          }
        }

        dfa.transitions[currentStateName][symbol] = nextStateName;
      }
    }
  }

  return dfa;
}
