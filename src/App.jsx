import { useState } from "react";
import "./App.css";
import FaFormLayout from "./components/FaForm/FaFormLayout";
import FAHistoryLayout from "./components/FaHistory/FaHistoryLayout.jsx";

function App() {
  const dummyData = [
    { title: "Even number of a's", type: "NFA" },
    { title: "Odd number of a's", type: "DFA" },
    { title: "Even number of b's", type: "NFA" },
    { title: "Even number of b's", type: "NFA" },
    { title: "Even number of b's", type: "NFA" },
    { title: "Even number of b's", type: "NFA" },
    { title: "Even number of b's", type: "NFA" },
    { title: "Even number of b's", type: "NFA" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Finite Automata Analyzer
      </h1>

      {/* Creation Form */}
      <div className="mb-12">
        <FaFormLayout />
      </div>

      {/* FA History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Finite Automata</h2>
        <FAHistoryLayout history={dummyData} />
      </div>
    </div>
  );
}

export default App;
