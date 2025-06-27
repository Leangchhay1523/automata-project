- Overview

    Tests whether a given input string is accepted by a Finite Automaton (FA), handling both Non-deterministic Finite Automata (NFA) and Deterministic Finite Automata (DFA).

- Steps

    - Extract Components: Takes a Finite Automaton (automaton) and extracts its alphabet, transitions, startState, acceptStates, and type using destructuring.

- NFA Processing (if type === "NFA"):
    - Starts with the ε-closure of the startState to get the initial set of current states.
    
    - For each symbol in the input:

    - Checks if the symbol is in the alphabet; if not, throws an error (Unknown symbol).

    - Computes the next set of states by collecting all reachable states for the symbol from each current state, including their ε-closures.

    - Updates the current state set to the new set.

    - Returns true if any state in the final set is an acceptState, otherwise false.

- DFA Processing (if type !== "NFA"):

    - Starts with the startState as the current state.

    - For each symbol in the input:

    - Checks if the symbol is in the alphabet; if not, throws an error (Unknown symbol).

    - Retrieves the transition target for the current state and symbol.

    - If no transition exists, throws an error (No transition).

    - If the target is a string, moves to that state.

    - If the target is an array, ensures it has exactly one element (DFA requirement); otherwise, throws an error (Invalid DFA transition).

    - Updates the current state to the target state.

    - Returns true if the final state is in acceptStates, otherwise false.

- Output
    Returns true if the input string is accepted by the FA (reaches an accept state), or false if not. Throws errors for invalid symbols, missing transitions, or invalid DFA transition formats.