export default function FATablePopup({ fa, onClose }) {
  const headers = ["State", ...fa.alphabet];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm max-w-3xl w-full mx-4 p-6 relative overflow-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Transition Table</h2>

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
      </div>
    </div>
  );
}
