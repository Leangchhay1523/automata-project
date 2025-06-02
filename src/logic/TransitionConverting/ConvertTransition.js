const transitions = [
  {
    id: 1748796299026,
    currentState: "q1",
    inputSymbol: "b",
    nextState: "q1",
  },
  {
    id: 1748796299462,
    currentState: "q0",
    inputSymbol: "b",
    nextState: "q2",
  },
  {
    id: 1748796299899,
    currentState: "q5",
    inputSymbol: "a",
    nextState: "q0",
  },
  {
    id: 1748796300366,
    currentState: "q0",
    inputSymbol: "b",
    nextState: "q1",
  },
  {
    id: 1748796300796,
    currentState: "q0",
    inputSymbol: "b",
    nextState: "q0",
  },
  {
    id: 1748796301247,
    currentState: "q3",
    inputSymbol: "b",
    nextState: "q4",
  },
];

const processingRawTransition = (rawTransition, symbols) => {
  const structureTransition = {};

  for (const { currentState, inputSymbol, nextState } of rawTransition) {
    if (!structureTransition[currentState]) {
      structureTransition[currentState] = {};
    }
    if (!structureTransition[currentState][inputSymbol]) {
      structureTransition[currentState][inputSymbol] = [];
    }
    structureTransition[currentState][inputSymbol].push(nextState);
  }

  // Ensure every state has all symbols as keys
  for (const state in structureTransition) {
    for (const symbol of symbols) {
      if (!structureTransition[state][symbol]) {
        structureTransition[state][symbol] = [];
      }
    }
  }

  return structureTransition;
};

export { processingRawTransition };
