// Component
import Input from "../common/Input";
import Button from "../common/Button";

// Icon
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

// React Functions
import { useState, useEffect } from "react";
import SingleSelectionDropDown from "../common/SingleSelectionDropDown";
import FaTransitionsInput from "./FaTransitionsInput";

// Functions
import { processingRawTransition } from "../../logic/TransitionConverting/ConvertTransition";

export default function FaFormLayout() {
  // Variables
  const style = {
    form: "p-[10px] border border-solid border-(--color-gray) rounded-[10px] w-full lg:w-[950px] flex flex-col gap-[20px]",
    formTitle: "font-raleway-bold text-2xl font-bold",
    formSubtitle: "font-roboto text-(--color-gray) text-base",
    label: "font-roboto text-[17px]",
    state:
      "text-sm gap-[5px] font-bold flex justify-center items-center rounded-[20px] px-[10px] py-[3px] border border-solid border-(--color-gray)",
  };
  // States
  const [faName, setFaName] = useState(""); // Official name of the FA
  const [faState, setFaState] = useState([]); // Official state of the FA
  const [stateCounter, setStateCounter] = useState(0);
  const [tempSymbol, setTempSymbol] = useState("");
  const [faAlphabet, setFaAlphabet] = useState(["ε"]); // Official alphabet of the FA
  const [symbolError, setSymbolError] = useState(false);
  const [allRawTransition, setallRawTransition] = useState([]);
  const [faAllTransitions, setFaAllTransitions] = useState({}); // Offical transition of the FA
  // Functions
  // General functions`
  useEffect(() => {
    console.log("FA States: ", faState);
  }, [faState]);
  useEffect(() => {
    console.log("FA Alphabet: ", faAlphabet);
  }, [faAlphabet]);
  // Fa Name Function
  const handleFaName = (data) => {
    setFaName(data);
  };
  // Fa State Function
  const addState = () => {
    const newState = `q${stateCounter}`;
    setFaState((prev) => {
      const updated = [...prev, newState];
      return [...new Set(updated)];
    });
    setStateCounter((prev) => prev + 1);
  };
  const removeState = (index) => {
    setFaState((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);

      const newCount = newState.length;
      setStateCounter(newCount);
      return newState;
    });
  };
  const clearState = () => {
    setFaState([]);
    setStateCounter(0);
  };
  // Fa Alphabet Function
  const handleSymbol = (e) => {
    setTempSymbol(e.target.value);
  };
  const addSymbol = () => {
    if (tempSymbol.trim() === "") {
      setSymbolError(true);
      return;
    }

    setFaAlphabet((prev) => {
      setSymbolError(false);
      const newAlphabet = [...prev, tempSymbol];
      return [...new Set(newAlphabet)];
    });

    setTempSymbol("");
  };
  const removeSymbol = (index) => {
    setFaAlphabet((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };
  const clearSymbol = () => {
    setFaAlphabet([]);
  };
  // Fa Transition Function
  useEffect(() => {
    console.log("Updated Transition Inputs: ", allRawTransition);
  }, [allRawTransition]);

  const addTransition = () => {
    setallRawTransition((prev) => [
      ...prev,
      { id: Date.now(), currentState: "", inputSymbol: "", nextState: "" },
    ]);
  };

  const handleTransitionChange = (index, field, value) => {
    setallRawTransition((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveTransition = (index) => {
    setallRawTransition((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={style.form}>
      <div>
        <h1 className={style.formTitle}>Create New Finite Automaton</h1>
        <p className={style.formSubtitle}>
          Define the components of your finite autumaton
        </p>
      </div>
      <div>
        <p className={style.label}>FA Name</p>
        <Input
          placeholder={"Enter a name for your FA"}
          width={"w-full"}
          onChange={handleFaName}
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between items-center">
          <p className={style.label}>States</p>
          <div className="flex gap-[10px]">
            <Button
              isPrimary={false}
              onClick={clearState}
              content={"Clear States"}
            />
            <Button
              isPrimary={false}
              onClick={addState}
              content={"Add State"}
            />
          </div>
        </div>
        <div className="flex justify-between w-[80%]">
          <div className="flex gap-[10px] flex-wrap">
            {faState.map((state, index) => (
              <div key={index} className={style.state}>
                <span>{state}</span>
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => removeState(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between items-center">
          <p className={style.label}>Alphabets</p>
          {symbolError && (
            <p className="text-red-500 font-semibold">Invalid Symbol</p>
          )}
          <div className="flex gap-[10px] items-center">
            <input
              className="border border-(--color-dark) w-[150px] border-solid rounded-sm px-4 py-2 h-[40px] focus:outline-none focus:ring-2 focus:ring-(--color-dark)"
              placeholder={"Enter Symbol"}
              onChange={handleSymbol}
              value={tempSymbol}
            />
            <Button
              isPrimary={false}
              onClick={clearSymbol}
              content={"Clear Symbols"}
            />
            <Button
              isPrimary={false}
              onClick={addSymbol}
              content={"Add Symbol"}
            />
          </div>
        </div>
        <div className="flex justify-between w-[80%]">
          <div className="flex gap-[10px] flex-wrap">
            {faAlphabet.map((symbol, index) => (
              <div key={index} className={style.state}>
                <span>{symbol}</span>
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => removeSymbol(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Transition  */}
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between items-center">
          <p className={style.label}>Transitions</p>
          <Button
            isPrimary={false}
            onClick={addTransition}
            content={"Add Transition"}
          />
        </div>
        <div className="flex justify-between w-full mt-[5px] rounded-t-[10px] border border-gray-400 flex-col">
          <div className="grid px-[10px] grid-cols-[1fr_1fr_1fr_0.5fr] gap-[10px] py-[5px] border-b border-gray-400">
            <p className="font-raleway-bold ">From State</p>
            <p className="font-raleway-bold ">Input Symbol</p>
            <p className="font-raleway-bold ">To State</p>
            <p className="font-raleway-bold text-right">Remove</p>
          </div>
          {allRawTransition.map((t, index) => {
            return (
              <FaTransitionsInput
                key={t.id}
                index={index}
                faState={faState}
                faAlphabet={faAlphabet}
                currentState={t.currentState}
                inputSymbol={t.inputSymbol}
                nextState={t.nextState}
                onChange={handleTransitionChange}
                onRemove={handleRemoveTransition}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
