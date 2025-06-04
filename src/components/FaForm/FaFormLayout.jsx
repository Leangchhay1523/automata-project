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
import MultiSelectDropdown from "../common/MultiSelectionDropDown";

export default function FaFormLayout() {
  // Variables
  const style = {
    form: "p-2 sm:p-4 border border-solid border-(--color-gray) rounded-lg w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-4xl flex flex-col gap-4 sm:gap-5",
    formTitle: "font-raleway-bold text-xl sm:text-2xl font-bold",
    formSubtitle: "font-roboto text-(--color-gray) text-sm sm:text-base",
    label: "font-roboto text-sm sm:text-base md:text-lg",
    state:
      "text-xs sm:text-sm gap-1 sm:gap-2 font-bold flex justify-center items-center rounded-full px-2 sm:px-3 py-1 border border-solid border-(--color-gray)",
    error: "text-red-500 font-semibold",
  };
  // States
  const [fa, setFa] = useState({});
  const [faName, setFaName] = useState(""); // Official name of the FA
  const [faState, setFaState] = useState([]); // Official state of the FA
  const [tempSymbol, setTempSymbol] = useState("");
  const [faAlphabet, setFaAlphabet] = useState([]); // Official alphabet of the FA
  const [symbolError, setSymbolError] = useState(false);
  const [allRawTransition, setallRawTransition] = useState([]);
  const [faAllTransitions, setFaAllTransitions] = useState({}); // Offical transition of the FA
  const [faStartState, setFaStartState] = useState("");
  const [faFinalState, setFaFinalState] = useState([]);
  // Error States
  const [checkName, setCheckName] = useState(false);
  const [checkState, setCheckState] = useState(false);
  const [checkAlphabet, setCheckAlphabet] = useState(false);
  const [checkTransition, setCheckTransition] = useState(false);
  const [checkStartState, setCheckStartState] = useState(false);
  const [checkFinalState, setCheckFinalState] = useState(false);
  // Functions
  const validateTransition = () => {
    for (let t of allRawTransition) {
      if (t.currentState === "" || t.inputSymbol === "" || t.nextState === "") {
        return true;
      }
    }
  };
  const validateFa = () => {
    let isValid = true;

    if (faName.trim() === "") {
      setCheckName(true);
      isValid = false;
    } else {
      setCheckName(false);
    }

    if (faState.length === 0) {
      setCheckState(true);
      isValid = false;
    } else {
      setCheckState(false);
    }

    if (faAlphabet.length === 0) {
      setCheckAlphabet(true);
      isValid = false;
    } else {
      setCheckAlphabet(false);
    }

    if (allRawTransition.length === 0 || validateTransition()) {
      setCheckTransition(true);
      isValid = false;
    } else {
      setCheckTransition(false);
    }

    if (faStartState === "") {
      setCheckStartState(true);
      isValid = false;
    } else {
      setCheckStartState(false);
    }

    if (faFinalState.length === 0) {
      setCheckFinalState(true);
      isValid = false;
    } else {
      setCheckFinalState(false);
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateFa()) {
      console.log("Invalid FA");
      return;
    }

    console.log("FA is valid.");
    console.log("Processing Transition");

    console.log("Raw Transition: ", allRawTransition);

    const processed = processingRawTransition(allRawTransition, faAlphabet);
    console.log("Processed Transition: ", processed);
    setFaAllTransitions(processed);

    console.log("Wrapping FA");
    const newFa = {
      type: "",
      name: faName,
      states: faState,
      alphabet: faAlphabet,
      transitions: processed,
      startState: faStartState,
      acceptStates: faFinalState,
    };
    console.log(newFa);
  };
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
    setFaState((prev) => [...prev, `q${prev.length}`]);
  };
  const removeState = (index) => {
    setFaState((prevState) => {
      const newState = prevState.filter((_, i) => i !== index);
      // Renaming all to q0, q1, ...
      return newState.map((_, i) => `q${i}`);
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

  // FA Start State
  const receiveStartState = (option) => {
    setFaStartState(option);
  };

  // FA Final State
  const receiveFinalState = (option) => {
    setFaFinalState(option);
  };

  useEffect(() => {
    console.log(faFinalState);
  }, [faFinalState]);

  return (
    <div className={style.form}>
      <div>
        <h1 className={style.formTitle}>Create New Finite Automaton</h1>
        <p className={style.formSubtitle}>
          Define the components of your finite automaton
        </p>
      </div>
      <div>
        <div className="flex flex-col sm:flex-row sm:gap-4 items-start sm:items-center">
          <p className={style.label}>FA Name</p>
          {checkName && <p className={style.error}>FA name is required</p>}
        </div>
        <Input
          placeholder={"Enter a name for your FA"}
          width={"w-full"}
          onChange={handleFaName}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <p className={style.label}>States</p>
            {checkState && (
              <p className={style.error}>At least one state is required</p>
            )}
          </div>
          <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0">
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
        <div className="flex justify-start w-full sm:w-[80%]">
          <div className="flex gap-2 sm:gap-3 flex-wrap">
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <p className={style.label}>Alphabets</p>
            {checkAlphabet && (
              <p className={style.error}>At least one symbol is required</p>
            )}
          </div>
          {symbolError && <p className={style.error}>Invalid Symbol</p>}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center mt-2 sm:mt-0">
            <input
              className="border border-(--color-dark) w-full sm:w-36 rounded-sm px-3 py-1.5 h-9 sm:h-10 focus:outline-none focus:ring-2 focus:ring-(-color--dark)"
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
        <div className="flex justify-start w-full sm:w-[80%]">
          <div className="flex gap-2 sm:gap-3 flex-wrap">
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
      {/* Transition */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <p className={style.label}>Transitions</p>
            {checkTransition && (
              <p className={style.error}>Transition function is missing</p>
            )}
          </div>
          <Button
            isPrimary={false}
            onClick={addTransition}
            content={"Add Transition"}
          />
        </div>
        <div className=" flex justify-between w-full mt-[5px] rounded-[10px] border border-gray-400 flex-col">
          <div className="grid px-[10px] grid-cols-[1fr_1fr_1fr_0.5fr] rounded-[10px] gap-[10px] py-[5px] border-b border-gray-400">
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
      {/* Start State */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <p className={style.label}>Start State</p>
          {checkStartState && (
            <p className={style.error}>Start state is required</p>
          )}
        </div>
        <SingleSelectionDropDown
          selectedIcon={TiTick}
          option={faState}
          className="h-9 sm:h-10"
          setOption={receiveStartState}
        />
      </div>
      {/* Final State */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <p className={style.label}>Final State</p>
          {checkFinalState && (
            <p className={style.error}>At least one final state is required</p>
          )}
        </div>
        <MultiSelectDropdown
          selectedIcon={TiTick}
          option={faState}
          className="h-9 sm:h-10"
          sendResult={receiveFinalState}
        />
      </div>
      <Button
        onClick={handleSubmit}
        content={"Create FA"}
        isPrimary={true}
        className="self-end mt-2"
      />
    </div>
  );
}
