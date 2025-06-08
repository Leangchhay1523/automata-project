//Step1: Remove Unrechable states (using BFS)
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
    states: dfa.states.filter(s => reachable.has(s)),
    alphabet: dfa.alphabet,
    transitions: {},
    startState: dfa.startState,
    acceptStates: dfa.acceptStates.filter(s => reachable.has(s))
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
    new Set(dfa.states.filter(s => !dfa.acceptStates.includes(s)))
  ];
  // Loop will true when in each group(accept and non-accept) and each state(each state in that group) have different target state(during transition)
  let updated = true;
  while (updated) {
    updated = false;
    // Prepare for new partition(new state)
    const newPartitions = [];

    for (const group of partitions) {
      const grouped = new Map();

      for (const state of group) {
        // signature hold the target state of current state to find which partiton(accept group or not) that the target state in
        const signature = dfa.alphabet.map(symbol => {
          const target = dfa.transitions[state]?.[symbol]?.[0]; // .[0] important??
          const groupIndex = partitions.findIndex(p => p.has(target));
          return groupIndex;
        }).join(',');

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

  partitions.forEach((group) => {
    const representative = [...group][0]; // Pick any one state from the group to find target state(for new state)

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

    // Create transitions using representative
    newTransitions[groupName] = {};
    for (const symbol of dfa.alphabet) {
      const target = dfa.transitions[representative]?.[symbol]?.[0];
      if (target && stateMap[target]) {
        newTransitions[groupName][symbol] = [stateMap[target]];
      }
    }

    // Accept state check
    if ([...group].some(s => dfa.acceptStates.includes(s))) {
      newAcceptStates.push(groupName);
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
    acceptStates: newAcceptStates
  };
}

const dfa = {
  id: "5",
  name: "DFA_TestMinimization",
  type: "DFA",
  states: ["q0", "q1", "q2", "q3", "q4", "q5", "q6"],
  alphabet: ["0", "1"],
  transitions: {
    "q0": { "0": ["q1"], "1": ["q2"] },
    "q1": { "0": ["q1"], "1": ["q3"] },
    "q2": { "0": ["q1"], "1": ["q3"] },
    "q3": { "0": ["q3"], "1": ["q3"] },
    "q4": { "0": ["q4"], "1": ["q5"] },
    "q5": { "0": ["q5"], "1": ["q4"] },
    "q6": { "0": ["q6"], "1": ["q6"] }
  },
  startState: "q0",
  acceptStates: ["q2", "q3"]
};


const reachableDFA = removeUnreachableStates(dfa);
const partitions = refinePartitions(reachableDFA);
const minimizedDFA = buildMinimizedDFA(reachableDFA, partitions);
console.log(JSON.stringify(minimizedDFA));