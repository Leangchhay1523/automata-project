import { epsilonClosure } from "../utils/epsilonClosure.js";

// Function to test string type
export default function testString(automaton, input) {
  const { alphabet, transitions, startState, acceptStates, type } = automaton;
  // NFA: simulate with ε-closure and subset transitions
  if (type === "NFA") {
    // start with ε-closure of the start state
    let current = new Set(epsilonClosure([startState], transitions));
    for (const sym of input) {
      if (!alphabet.includes(sym)) {
        throw new Error(`Unknown symbol '${sym}'`);
      }
      const nextSet = new Set();
      for (const state of current) {
        const targets = transitions[state]?.[sym] || [];
        for (const t of targets) {
          // include ε-closure of each reachable state
          for (const u of epsilonClosure([t], transitions)) {
            nextSet.add(u);
          }
        }
      }
      current = nextSet;
    }
    // accepted if any current state is final
    return [...current].some((s) => acceptStates.includes(s));
  }

  // DFA: deterministic single-path traversal
  let state = startState;
  for (const sym of input) {
    if (!alphabet.includes(sym)) {
      throw new Error(`Unknown symbol '${sym}'`);
    }
    const targets = transitions[state]?.[sym];
    if (!targets) {
      throw new Error(`No transition from state '${state}' on '${sym}'`);
    }
    if (typeof targets === "string") {
      // single target state as string
      state = targets;
    } else if (Array.isArray(targets)) {
      // if array, must have exactly one element for DFA
      if (targets.length !== 1) {
        throw new Error(
          `Invalid DFA transition at state '${state}' on '${sym}', expected single target`
        );
      }
      state = targets[0];
    } else {
      throw new Error(
        `Invalid transition format at state '${state}' on '${sym}'`
      );
    }
  }
  return acceptStates.includes(state);
}
