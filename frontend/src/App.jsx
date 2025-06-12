import { useState } from "react";
import "./App.css";
import FaFormLayout from "./components/FaForm/FaFormLayout";
import FAHistoryLayout from "./components/FaHistory/FaHistoryLayout.jsx";
import FaOperationsLayout from "./components/FaOperations/FaOperationsLayout.jsx";

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
    <div className="bg-gray-50 w-full flex flex-col justify-center items-center min-h-screen p-4 gap-4">
      <h1 className="text-3xl font-bold text-center bg-gray">
        Finite Automata Analyzer
      </h1>

      {/* Creation Form */}
      <FaFormLayout />

      {/* FA History */}
      <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-8/10">
        <h2 className="text-xl font-semibold">Your Finite Automata</h2>
        <FAHistoryLayout history={dummyData} />
      </div>

      {/* Operations Section */}
      <FaOperationsLayout />
    </div>
  );
}

export default App;
