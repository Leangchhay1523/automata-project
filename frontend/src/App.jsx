import { useState } from "react";
import "./App.css";
import FaFormLayout from "./components/FaForm/FaFormLayout";
import FAHistoryLayout from "./components/FaHistory/FaHistoryLayout.jsx";
import FaOperationsLayout from "./components/FaOperations/FaOperationsLayout.jsx";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

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
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center bg-gray">
          Finite Automata App
        </h1>
        <p className="text-(--color-gray) text-[18px]">
          Create and Manage your FA
        </p>
      </div>

      {/* Creation Form */}
      <FaFormLayout />

      {/* FA History */}
      <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-8/10">
        <FAHistoryLayout />
      </div>

      {/* Operations Section */}
      <FaOperationsLayout />
    </div>
  );
}

export default App;
