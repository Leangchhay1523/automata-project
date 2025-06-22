
// Step 1: Remove unreachable states
export function removeUnreachableStates(dfa) {
  const reachable = new Set();
  const queue = [dfa.startState];

  while (queue.length) {
    const state = queue.shift();
    if (!reachable.has(state)) {
      reachable.add(state);
      const transMap = dfa.transitions[state] || {};
      for (const sym of dfa.alphabet) {
        // ⬅️ coerce to array even if map[sym] is a single string
        const targets = Array.isArray(transMap[sym]) ? transMap[sym] : [transMap[sym]];
        targets.forEach((t) => {
          if (t != null && !reachable.has(t)) queue.push(t);
        });
      }
    }
  }

  // build a cleaned DFA containing only reachable states
  const cleaned = {
    id: dfa.id,
    name: dfa.name,
    type: dfa.type,
    states: Array.from(reachable),
    alphabet: dfa.alphabet,
    transitions: {},
    startState: dfa.startState,
    acceptStates: dfa.acceptStates.filter((s) => reachable.has(s)),
  };

  for (const s of cleaned.states) {
    const map = dfa.transitions[s] || {};
    cleaned.transitions[s] = {};
    for (const sym of dfa.alphabet) {
      const targets = Array.isArray(map[sym]) ? map[sym] : [map[sym]];
      cleaned.transitions[s][sym] = targets.filter((t) => t != null && reachable.has(t));
    }
  }

  return cleaned;
}

// Step 2 & 3: Compute partition refinement
export function refinePartitions(dfa) {
  let partitions = [
    new Set(dfa.acceptStates),
    new Set(dfa.states.filter((s) => !dfa.acceptStates.includes(s))),
  ];
  let updated = true;

  while (updated) {
    updated = false;
    const newParts = [];

    for (const group of partitions) {
      const buckets = new Map();

      for (const state of group) {
        const transMap = dfa.transitions[state] || {};
        // build a signature that says “on each symbol, which partition do I go to?”
        const sig = dfa.alphabet
          .map((sym) => {
            const targets = Array.isArray(transMap[sym]) ? transMap[sym] : [transMap[sym]];
            // look up the index of each target’s partition
            const idxs = targets.map((t) =>
              partitions.findIndex((p) => p.has(t))
            );
            return idxs.join(',');
          })
          .join('|');

        if (!buckets.has(sig)) buckets.set(sig, new Set());
        buckets.get(sig).add(state);
      }

      if (buckets.size > 1) updated = true;
      for (const subset of buckets.values()) {
        newParts.push(subset);
      }
    }

    partitions = newParts;
  }

  return partitions;
}

// Step 4: Build the minimized DFA from partitions
export function buildMinimizedDFA(dfa, partitions) {
  const stateMap = {};
  const newStates = [];
  const newTrans = {};
  const newAccept = [];
  const nameByGroup = new Map();
  let counter = 1;

  // assign new state names
  for (const grp of partitions) {
    const repr = [...grp][0];
    const name = grp.has(dfa.startState) ? 'Q0' : `Q${counter++}`;
    nameByGroup.set(grp, name);
    newStates.push(name);
    for (const s of grp) stateMap[s] = name;
    if ([...grp].some((s) => dfa.acceptStates.includes(s))) {
      newAccept.push(name);
    }
  }

  // build transition table
  for (const [grp, name] of nameByGroup.entries()) {
    newTrans[name] = {};
    // pick any representative old state
    const repr = [...grp][0];
    const transMap = dfa.transitions[repr] || {};
    for (const sym of dfa.alphabet) {
      const targets = Array.isArray(transMap[sym]) ? transMap[sym] : [transMap[sym]];
      // all targets in this DFA collapse into one new state
      const first = targets.find((t) => t != null);
      if (first != null) {
        newTrans[name][sym] = stateMap[first];
      }
    }
  }

  return {
    id: dfa.id,
    name: `${dfa.name}_Minimized`,
    type: 'DFA',
    states: newStates,
    alphabet: dfa.alphabet,
    transitions: newTrans,
    startState: 'Q0',
    acceptStates: newAccept,
  };
}

// Function to perForm the minimize operation
function minimizeDfa(dfa) {
  const clean = removeUnreachableStates(dfa);
  const parts = refinePartitions(clean);
  return buildMinimizedDFA(clean, parts);
}

export { minimizeDfa };
export default minimizeDfa;
