- Raw Transition

```js
{
    currentState: "",
    inputSymbol: "",
    nextState: ""
}
```

- List of Raw Transition

```js
[
  {
    currentState: "",
    inputSymbol: "",
    nextState: "",
  },
  {
    currentState: "",
    inputSymbol: "",
    nextState: "",
  },
  {
    currentState: "",
    inputSymbol: "",
    nextState: "",
  },
];
```

- Structured Transition

```js
  {
  "q0": {"s1": ["states"], "s2": ["states"] }
  }
```

- Object of Structured Transition

```js
  {
  "q0": { "a": ["q1"], "b": ["q2"] },
  "q1": { "a": ["q0"], "b": ["q2"] },
  "q2": { "a": ["q2"], "b": ["q1"] }
  }
```
