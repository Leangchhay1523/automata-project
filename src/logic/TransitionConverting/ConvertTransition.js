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
