- [Finite Automata Storage Design and Structure](#finite-automata-storage-design-and-structure)
  - [1. Overview](#1-overview)
  - [2. Formal Definition of Finite Automaton](#2-formal-definition-of-finite-automaton)
  - [3. Where FAs are Stored?](#3-where-fas-are-stored)
  - [4. JSON Structure Overview](#4-json-structure-overview)

# Finite Automata Storage Design and Structure

## 1. Overview

This document briefly describes how FAs (NFA/DFA) are stored in our system including the data models.

## 2. Formal Definition of Finite Automaton

Every finite automaton in the system is defined by a 5-tuple (Q, Σ, q, F, δ) where:

| Component | Description          | Example      |
| --------- | -------------------- | ------------ |
| Q         | Finite set of states | {q0, q1, q2} |
| Σ         | Set of input symbols | {a, b, c}    |
| δ         | Transition function  | q0 x a -> q1 |
| q         | Initial state        | q0           |
| F         | Set of final states  | {q1, q2}     |

## 3. Where FAs are Stored?

All FAs are stored in a single JSON file in `/src/data/FaData.json`.

## 4. JSON Structure Overview

```json
{
  "id": "",
  "type": "",
  "name": "",
  "states": [...],
  "alphabet": [...],
  "transitions": {
    "q0": { "symbol": [], "symbol": [], ... },
    "q1": { "symbol": [], "symbol": [], ... },
    "q2": { "symbol": [], "symbol": [], ... }
  },
  "startState": "",
  "acceptStates": [...]
}
```

Example:

```json
{
  "id": "",
  "name": "fa's name",
  "type": "DFA",
  "states": ["q0", "q1", "q2"],
  "alphabet": ["a", "b"],
  "transitions": {
    "q0": { "a": ["q1"], "b": ["q2"] },
    "q1": { "a": ["q0"], "b": ["q2"] },
    "q2": { "a": ["q2"], "b": ["q1"] }
  },
  "startState": "q0",
  "acceptStates": ["q2"]
}
```
