import Button from "../common/Button";
import Input from "../common/Input";
import { useState, useEffect } from "react";
import SingleSelectionDropDown from "../common/SingleSelectionDropDown";
import { TiTick } from "react-icons/ti";

export default function FaConverter() {
  const [inputError, setInputError] = useState(false);
  const [reset, setReset] = useState(false);
  const [selectedNFA, setSelectedNFA] = useState(""); // NFA ID
  const [showResult, setShowResult] = useState(false);

  const style = {
    error: "text-red-500 font-semibold",
  };

  //TODO: Fetch NFA from server
  const NFA = [
    { id: "1", name: "NFA 1" },
    { id: "2", name: "NFA 2" },
    { id: "3", name: "NFA 3" },
    { id: "4", name: "NFA 4" },
    { id: "5", name: "NFA 5" },
    { id: "6", name: "NFA 6" },
  ];

  const handleSubmit = () => {
    if (selectedNFA.trim() === "") {
      setInputError(true);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <p className="font-roboto-bold">Select an NFA to convert to DFA</p>
        {inputError && <p className={style.error}>Please choose an NFA</p>}
      </div>
      <SingleSelectionDropDown
        selectedIcon={TiTick}
        reset={reset}
        option={NFA}
        className="h-[40px]"
        placeholder={"Select an NFA"}
        setOption={setSelectedNFA}
        showFA={true}
        faType={"NFA"}
      />
      <Button
        content={"Convert to DFA"}
        isPrimary={true}
        onClick={handleSubmit}
      />
      {showResult && (
        <div className="flex flex-col gap-3">
          <p className="font-raleway-bold w-full text-[20px]">Result</p>
          <div>
            <p>Original DFA</p>
            <Table fa={fa} />
          </div>
          <div>
            <p>Minimized DFA</p>
            <Table fa={fa} />
          </div>
        </div>
      )}
    </div>
  );
}
