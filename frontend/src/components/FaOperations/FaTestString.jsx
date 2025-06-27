import Button from "../common/Button";
import Input from "../common/Input";
import { useState, useEffect } from "react";
import { testString } from "@/api/api.js";
import { useFaContext } from "@/context/FaContext";
//TODO: impot the actual logic for testing the string against a finite automaton

export default function FaTestString({ loadedFA }) {
  const [inputStr, setInputStr] = useState("");
  const [lastTestedStr, setLastTestedStr] = useState("");
  const [result, setResult] = useState(null); // null | "accept" | "reject"
  const [inputError, setInputError] = useState(false);
  const [normal, setNormal] = useState(true);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [noFaError, setNoFaError] = useState(false);
  const [loadedFa, setLoadedFa] = useState("");
  const { selectedFA } = useFaContext();

  const style = {
    error: "text-red-500 font-semibold",
    result: "flex justify-center items-center rounded-sm p-2",
    normal: "border-2 border-[#cfcfcf] bg-(--color-dark-gray)",
    accept:
      "border-2 border-[#00B515] bg-[rgba(16,185,129,0.5)] text-[#00B515]",
    reject: "border-2 border-[#DB0303] bg-[rgba(239,68,68,0.5)] text-[#DB0303]",
  };

  useEffect(() => {
    if (selectedFA) {
      setLoadedFa(selectedFA.id);
      console.log("Selected FA:", selectedFA);
      setNoFaError(false);
    }
  }, [selectedFA]);

  useEffect(() => {
    if (inputStr.trim() === "") {
      setNormal(true);
      setAccept(false);
      setReject(false);
    }
  }, [inputStr]);

  const testFaString = async (str) => {
    try {
      const response = await testString(loadedFa, str);
      return response.accepted;
    } catch (error) {
      console.error("Error testing string:", error);
      return false;
    }
  };

  const handleInputStr = (data) => {
    setInputStr(data);
    setResult(null); // Reset result when input changes
  };

  const handleSubmit = async () => {
    if (!loadedFa) {
      setNoFaError(true);
      return;
    }
    setInputError(false);

    const accepted = await testFaString(inputStr);
    setLastTestedStr(inputStr);
    setResult(accepted ? "accept" : "reject");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <p className="font-roboto-bold">Enter a string to test</p>
        {inputError && <p className={style.error}>Please enter a string</p>}
        {noFaError && <p className={style.error}>Please load an FA</p>}
      </div>
      {selectedFA ? <p>FA: {selectedFA.name}</p> : <p>FA: No FA loaded</p>}
      <div className="w-full flex gap-3">
        <Input
          width="w-full"
          placeholder="e.g., aabba"
          value={inputStr}
          onChange={handleInputStr}
        />
        <Button content={"Test"} isPrimary={true} onClick={handleSubmit} />
      </div>
      {result === null && (
        <div className={`${style.result} ${style.normal}`}>
          Result appears here
        </div>
      )}
      {result === "accept" && (
        <div className={`${style.result} ${style.accept}`}>
          {lastTestedStr} is accepted
        </div>
      )}
      {result === "reject" && (
        <div className={`${style.result} ${style.reject}`}>
          {lastTestedStr} is rejected
        </div>
      )}
    </div>
  );
}
