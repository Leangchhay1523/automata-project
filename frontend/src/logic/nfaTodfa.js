// backend/logic/nfaToDfa.js
export default function nfaToDfa({
  states,
  alphabet,
  transitions: transInput,
  startState,
  acceptStates,
}) {
  // 1) Normalize your input into an array of {from,input,to}
  const transArray = Array.isArray(transInput)
    ? transInput
    : Object.entries(transInput).flatMap(([from, symMap]) =>
        Object.entries(symMap).flatMap(([input, toArr]) =>
          toArr.map((to) => ({ from, input, to }))
        )
      );

  const eps = ""; // ε‐symbol

  // 2) ε-closure
  function closure(set) {
    const result = new Set(set);
    const stack = [...set];
    while (stack.length) {
      const s = stack.pop();
      for (const { from, input, to } of transArray) {
        if (from === s && input === eps && !result.has(to)) {
          result.add(to);
          stack.push(to);
        }
      }
    }
    return result;
  }

  // 3) Move on a symbol
  function move(set, sym) {
    const result = new Set();
    for (const s of set) {
      for (const { from, input, to } of transArray) {
        if (from === s && input === sym) {
          result.add(to);
        }
      }
    }
    return result;
  }

  // 4) Start state’s closure
  const startClosKey = [...closure(new Set([startState]))].sort().join("_");
  const dfaMap = new Map([[startClosKey, closure(new Set([startState]))]]);
  const queue = [startClosKey];
  const rawTrans = [];

  // 5) Subset construction
  while (queue.length) {
    const key = queue.shift();
    const curr = dfaMap.get(key);
    for (const sym of alphabet) {
      const moved = move(curr, sym);
      const clos = closure(moved);
      if (clos.size === 0) continue;
      const newKey = [...clos].sort().join("_");
      if (!dfaMap.has(newKey)) {
        dfaMap.set(newKey, clos);
        queue.push(newKey);
      }
      rawTrans.push({ from: key, input: sym, to: newKey });
    }
  }

  // 6) Build the nested-object transitions
  const transitionsObj = {};
  for (const { from, input, to } of rawTrans) {
    transitionsObj[from] ??= {};
    transitionsObj[from][input] ??= [];
    if (!transitionsObj[from][input].includes(to)) {
      transitionsObj[from][input].push(to);
    }
  }

  // 7) Final DFA pieces
  const dfaStates = [...dfaMap.keys()];
  const dfaStart = startClosKey;
  const dfaAccept = dfaStates.filter((st) =>
    [...dfaMap.get(st)].some((orig) => acceptStates.includes(orig))
  );

  return {
    states: dfaStates,
    alphabet,
    transitions: transitionsObj,
    startState: dfaStart,
    acceptStates: dfaAccept,
  };
}
