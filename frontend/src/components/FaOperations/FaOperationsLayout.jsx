import { useState } from "react";
import FaTestString from "./FaTestString";
import FaConverter from "./FaConverter";
import FaMinimizer from "./FaMinimizer";

export default function FaOperationsLayout() {
  const [testFa, setTestFa] = useState(true);
  const [convertNFA, setConvertNFA] = useState(false);
  const [minimizeDFA, setMinimizeDFA] = useState(false);

  const style = {
    currentOption: "bg-white",
    option:
      "flex justify-center items-center py-1.5  flex-1 rounded-[7px] hover:bg-white cursor-pointer",
  };

  const chooseTestFa = () => {
    setTestFa(true);
    setConvertNFA(false);
    setMinimizeDFA(false);
  };

  const chooseConvertNFA = () => {
    setTestFa(false);
    setConvertNFA(true);
    setMinimizeDFA(false);
  };

  const chooseMinimizeDFA = () => {
    setTestFa(false);
    setConvertNFA(false);
    setMinimizeDFA(true);
  };

  return (
    <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-8/10 border border-(--color-gray) rounded-md p-2 sm:p-4 flex flex-col gap-4">
      <div>
        <p className="font-raleway-bold w-full text-[20px]">FA Operations</p>
        <p className="font-roboto text-(--color-gray)">
          Test and transform your finite automaton
        </p>
      </div>
      <div className="rounded-[10px] w-full h-max p-1 bg-(--color-dark-gray) grid grid-cols-1 sm:grid-cols-3 gap-1">
        <div
          className={`${style.option} ${testFa ? style.currentOption : ""}`}
          onClick={chooseTestFa}
        >
          Test String
        </div>
        <div
          className={`${style.option} ${convertNFA ? style.currentOption : ""}`}
          onClick={chooseConvertNFA}
        >
          Convert NFA to DFA
        </div>
        <div
          className={`${style.option} ${
            minimizeDFA ? style.currentOption : ""
          }`}
          onClick={chooseMinimizeDFA}
        >
          Minimize DFA
        </div>
      </div>
      {testFa && <FaTestString />}
      {convertNFA && <FaConverter />}
      {minimizeDFA && <FaMinimizer />}
    </div>
  );
}
