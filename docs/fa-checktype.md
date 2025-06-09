- Functions:
    1. checkFAType(fa)
            
    2. isDFA(fa)
        
        - Takes a Finite Automaton (fa) and extracts its states, alphabet, and transitions using destructuring.
            
        - Checks if the FA is a DFA by ensuring:
            
            1. Every state has a transition for every symbol in the alphabet (symbol in transitions[state]).
                
            2. Each transition leads to exactly one target state (checked by converting string targets to arrays and verifying targets.length === 1).
                
            3. No ε-transitions (empty string transitions) exist ("ε" in transitions[state]).
                
        - Returns true if all conditions are met (DFA), otherwise false (NFA).
        
        
- Output: Logs whether each FA in FaData is a DFA or NFA, numbered sequentially