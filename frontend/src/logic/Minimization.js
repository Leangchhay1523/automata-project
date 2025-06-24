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
        (transMap[sym] || []).forEach((t) => {
          if (!reachable.has(t)) queue.push(t);
        });
      }
    }
  }

  const cleaned = {
    ...dfa,
    states: dfa.states.filter((s) => reachable.has(s)),
    acceptStates: dfa.acceptStates.filter((s) => reachable.has(s)),
    transitions: {},
  };
  for (const s of cleaned.states) {
    if (dfa.transitions[s]) {
      cleaned.transitions[s] = { ...dfa.transitions[s] };
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
        // signature: list of indices of destination-groups
        const sig = dfa.alphabet
          .map((sym) => {
            const dest = (dfa.transitions[state]?.[sym] || [])[0];
            return partitions.findIndex((p) => p.has(dest));
          })
          .join(",");
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

// Step 4: Build the minimized DFA object
export function buildMinimizedDFA(dfa, partitions) {
  const stateMap = {};
  const newStates = [];
  const newTrans = {};
  const newAccept = [];
  const nameByGroup = new Map();
  let counter = 1;

  // assign group names
  for (const grp of partitions) {
    const repr = [...grp][0];
    const name = grp.has(dfa.startState) ? "Q0" : `Q${counter++}`;
    nameByGroup.set(grp, name);
    newStates.push(name);

    for (const s of grp) stateMap[s] = name;
    if ([...grp].some((s) => dfa.acceptStates.includes(s))) {
      newAccept.push(name);
    }
  }

  // transitions per new state
  for (const grp of partitions) {
    const repr = [...grp][0];
    const gName = nameByGroup.get(grp);
    newTrans[gName] = {};
    for (const sym of dfa.alphabet) {
      const dest = (dfa.transitions[repr]?.[sym] || [])[0];
      if (dest !== undefined) {
        newTrans[gName][sym] = [stateMap[dest]];
      }
    }
  }

  return {
    id: dfa.id,
    name: `${dfa.name}_Minimized`,
    type: "DFA",
    states: newStates,
    alphabet: dfa.alphabet,
    transitions: newTrans,
    startState: "Q0",
    acceptStates: newAccept,
  };
}

// The one-stop helper your controller will call:
function minimizeDfa(dfa) {
  const clean = removeUnreachableStates(dfa);
  const parts = refinePartitions(clean);
  return buildMinimizedDFA(clean, parts);
}
export { minimizeDfa };
export default minimizeDfa;
