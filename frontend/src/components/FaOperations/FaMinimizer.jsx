import Button from "../common/Button";
import Input from "../common/Input";
import { useState, useEffect } from "react";
import SingleSelectionDropDown from "../common/SingleSelectionDropDown";
import { TiTick } from "react-icons/ti";

export default function FaMinimizer() {
  const [inputError, setInputError] = useState(false);
  const [reset, setReset] = useState(false);
  const [selectedDFA, setSelectedDFA] = useState(""); // NFA ID

  const style = {
    error: "text-red-500 font-semibold",
  };

  //TODO: Fetch DFA from server
  const DFA = [
    { id: "1", name: "NFA 1" },
    { id: "2", name: "NFA 2" },
    { id: "3", name: "NFA 3" },
    { id: "4", name: "NFA 4" },
    { id: "5", name: "NFA 5" },
    { id: "6", name: "NFA 6" },
  ];

  const handleSubmit = () => {
    if (selectedDFA.trim() === "") {
      setInputError(true);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <p className="font-roboto-bold">Select DFA to minimize</p>
        {inputError && <p className={style.error}>Please choose a DFA</p>}
      </div>
      <SingleSelectionDropDown
        selectedIcon={TiTick}
        reset={reset}
        option={DFA}
        className="h-[40px]"
        placeholder={"Select a DFA"}
        setOption={setSelectedDFA}
        showFA={true}
        faType={"DFA"}
      />
      <Button
        content={"Minimize DFA"}
        isPrimary={true}
        onClick={handleSubmit}
      />
    </div>
  );
}
