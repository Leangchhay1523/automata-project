const processingRawTransition = (rawTransition, symbols, states) => {
  const structureTransition = {};

  // Initialize every state with all symbols as empty arrays
  for (const state of states) {
    structureTransition[state] = {};
    for (const symbol of symbols) {
      structureTransition[state][symbol] = [];
    }
  }

  // Fill in actual transitions
  for (const { currentState, inputSymbol, nextState } of rawTransition) {
    if (
      structureTransition[currentState] &&
      structureTransition[currentState][inputSymbol]
    ) {
      structureTransition[currentState][inputSymbol] = nextState;
    }
  }

  return structureTransition;
};

export { processingRawTransition };
