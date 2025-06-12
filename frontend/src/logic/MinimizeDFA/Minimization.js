//Step1: Remove Unreachable states (using BFS)
function removeUnreachableStates(dfa) {
  const reachable = new Set();
  const queue = [dfa.startState];

  // Find reachable states using BFS
  while (queue.length > 0) {
    const state = queue.shift();
    if (!reachable.has(state)) {
      reachable.add(state);
      const transitions = dfa.transitions[state];
      if (transitions) {
        for (const symbol of dfa.alphabet) {
          const targets = transitions[symbol] || [];
          for (const target of targets) {
            if (!reachable.has(target)) {
              queue.push(target);
            }
          }
        }
      }
    }
  }

  const cleanedDFA = {
    id: dfa.id,
    name: dfa.name,
    type: dfa.type,
    states: dfa.states.filter((s) => reachable.has(s)),
    alphabet: dfa.alphabet,
    transitions: {},
    startState: dfa.startState,
    acceptStates: dfa.acceptStates.filter((s) => reachable.has(s)),
  };

  for (const state of cleanedDFA.states) {
    const stateTransitions = dfa.transitions[state];
    if (stateTransitions) {
      cleanedDFA.transitions[state] = dfa.transitions[state];
    }
  }
  return cleanedDFA;
}

// Step 2 & 3: Initialize and refine partitions
function refinePartitions(dfa) {
  let partitions = [
    new Set(dfa.acceptStates),
    new Set(dfa.states.filter((s) => !dfa.acceptStates.includes(s))),
  ];

  // Filter out empty partitions
  partitions = partitions.filter((p) => p.size > 0);

  // Loop will true when in each group(accept and non-accept) and each state(each state in that group) have different target state(during transition)
  let updated = true;
  while (updated) {
    updated = false;
    // Prepare for new partition(new state)
    const newPartitions = [];

    for (const group of partitions) {
      const grouped = new Map();

      for (const state of group) {
        // signature hold the target state of current state to find which partition(accept group or not) that the target state in
        const signature = dfa.alphabet
          .map((symbol) => {
            const target = dfa.transitions[state]?.[symbol]?.[0]; // .[0] important??
            const groupIndex = partitions.findIndex((p) => p.has(target));
            return groupIndex;
          })
          .join(",");

        if (!grouped.has(signature)) {
          grouped.set(signature, new Set()); //Prepares a Set to collect all states with this transition behavior.
        }
        grouped.get(signature).add(state);
      }

      // group(Map) was split because states had different transition behaviors when its size > 1
      if (grouped.size > 1) updated = true;
      for (const set of grouped.values()) {
        newPartitions.push(set);
      }
    }
    // Replaces the old partitions array with the new one.
    partitions = newPartitions;
  }

  return partitions;
}

function buildMinimizedDFA(dfa, partitions) {
  const stateMap = {};
  const newStates = [];
  const newTransitions = {};
  const newAcceptStates = [];

  const groupNameMap = new Map();
  let stateCounter = 1; // Start from 1 (Q1, Q2, ...)

  // PHASE 1: Create all state mappings and determine accept states
  partitions.forEach((group) => {
    let groupName;

    // Check if this group contains the original start state
    if (group.has(dfa.startState)) {
      groupName = "Q0";
    } else {
      groupName = `Q${stateCounter++}`;
    }

    groupNameMap.set(group, groupName);
    newStates.push(groupName);

    // Map each original state to the new group name prepare for finding newtransition
    for (const state of group) {
      stateMap[state] = groupName;
    }

    // Accept state check
    if ([...group].some((s) => dfa.acceptStates.includes(s))) {
      newAcceptStates.push(groupName);
    }
  });

  // PHASE 2: Create transitions after all states are mapped\

  partitions.forEach((group) => {
    const representative = [...group][0];
    const groupName = groupNameMap.get(group);

    newTransitions[groupName] = {};
    for (const symbol of dfa.alphabet) {
      const target = dfa.transitions[representative]?.[symbol]?.[0];
      if (target !== undefined) {
        newTransitions[groupName][symbol] = [stateMap[target]];
      }
    }
  });

  const newStartState = "Q0";

  return {
    id: dfa.id,
    name: dfa.name + "_Minimized",
    type: "DFA",
    states: newStates,
    alphabet: dfa.alphabet,
    transitions: newTransitions,
    startState: newStartState,
    acceptStates: newAcceptStates,
  };
}

("Q1 (q0, q1)");

const dfa = {
  id: "test_merged_states",
  name: "DFA_ToBeMinimized",
  type: "DFA",
  states: ["A", "B", "C", "D", "E", "F"],
  alphabet: ["0", "1"],
  transitions: {
    A: { 0: ["B"], 1: ["C"] },
    B: { 0: ["B"], 1: ["D"] },
    C: { 0: ["B"], 1: ["D"] },
    D: { 0: ["E"], 1: ["F"] },
    E: { 0: ["E"], 1: ["F"] },
    F: { 0: ["F"], 1: ["F"] },
  },
  startState: "A",
  acceptStates: ["E", "F"],
};

const reachableDFA = removeUnreachableStates(dfa);
const partitions = refinePartitions(reachableDFA);
const minimizedDFA = buildMinimizedDFA(reachableDFA, partitions);
console.log(JSON.stringify(minimizedDFA));
// console.log(JSON.stringify(refinePartitions(dfa), null, 2));
// console.log(partitions);
console.log("A (q1, q2)"[0]);
