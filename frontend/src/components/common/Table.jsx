import React from "react";

export default function Table({ fa }) {
  const headers = ["State", ...fa.alphabet];

  return (
    <table className="w-full border-collapse table-auto text-center">
      <thead className="border border-solid">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-4 py-2 bg-gray-100 uppercase border border-solid"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fa.states.map((state, i) => {
          const label = `${state === fa.startState ? "→" : ""}${
            fa.acceptStates.includes(state) ? "*" : ""
          }${state}`;
          return (
            <tr key={i}>
              <td className="px-4 py-2 border">{label}</td>
              {fa.alphabet.map((symbol, j) => {
                const target = fa.transitions[state]?.[symbol] || [];
                const display = Array.isArray(target)
                  ? target.join(", ")
                  : target;
                return (
                  <td key={j} className="px-4 py-2 border">
                    {display || "∅"}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
