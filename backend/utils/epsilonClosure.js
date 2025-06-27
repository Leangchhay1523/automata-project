export function epsilonClosure(states, transitions) {
  const stack = [...states];
  const closure = new Set(states);

  while (stack.length) {
    const s = stack.pop();
    // look for ε‐moves (we use the empty string key)
    const epsTargets = transitions[s]?.["ε"] || [];
    for (const t of epsTargets) {
      if (!closure.has(t)) {
        closure.add(t);
        stack.push(t);
      }
    }
  }

  return [...closure];
}
