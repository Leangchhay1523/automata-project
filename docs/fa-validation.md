- [Finite Automata Validation Specification](#finite-automata-validation-specification)
  - [1. Overview](#1-overview)
  - [2. Formal Definition of Finite Automaton](#2-formal-definition-of-finite-automaton)
  - [2. Validation Rules](#2-validation-rules)

# Finite Automata Validation Specification

## 1. Overview

This document describes the rules and process used to validate an input Finite Automaton (FA) in the system. This does not refer to Deterministic Finite Automaton (DFA) or Non-Deterministic Finite Automaton (NFA) specifically, but refers to the general Finite Automaton (FA).

## 2. Formal Definition of Finite Automaton

A finite automaton is a 5-tuple (Q, Σ, q, F, δ) where:

| Component | Description          | Example      |
| --------- | -------------------- | ------------ |
| Q         | Finite set of state  | {q0, q1, q2} |
| Σ         | Set of input symbol  | {a, b, c}    |
| δ         | Transition functions | q0 x a -> q1 |
| q         | Initial state        | q0           |
| F         | Set of final states  | {q1, q2}     |

## 2. Validation Rules

Checking if an FA is a valid FA involves several key aspects:

**2.1 Check Set of State (Q)**

- Q has a finite number of state
- Q must be non-empty, at least one state.

**2.2 Check Alphabet (Σ)**

- Σ has a finite number of symbol
- Σ must be non-empty, at least one symbol.

**2.3 Check Transition Functions (δ)**

Every transition must have:

- The current state and all next states defined in a transition must be members of Q.
- All input symbols must be in Σ

**2.4 Check Initial State (q0)**

- There is only one start state
- The start state must be within Q

**2.5 Check Set of Final State (F)**

- Must be a subset of Q
- May be empty (Accept empty language)
