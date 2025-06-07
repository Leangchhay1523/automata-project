import Button from "../common/Button";
import Input from "../common/Input";
import { useState, useEffect } from "react";
//TODO: impot the actual logic for testing the string against a finite automaton

export default function FaTestString() {
  const [inputStr, setInputStr] = useState("");
  const [inputError, setInputError] = useState(false);
  const [normal, setNormal] = useState(true);
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  const style = {
    error: "text-red-500 font-semibold",
    result: "flex justify-center items-center rounded-sm p-2",
    normal: "border-2 border-[#cfcfcf] bg-(--color-dark-gray)",
    accept:
      "border-2 border-[#00B515] bg-[rgba(16,185,129,0.5)] text-[#00B515]",
    reject: "border-2 border-[#DB0303] bg-[rgba(239,68,68,0.5)] text-[#DB0303]",
  };

  useEffect(() => {
    if (inputStr.trim() === "") {
      setNormal(true);
      setAccept(false);
      setReject(false);
    }
  }, [inputStr]);

  //TODO: Replace this with actual logic to test the string against a finite automaton
  const testString = (str) => {
    if (str === "a") return false;
    if (str === "b") return true;
  };

  const handleInputStr = (data) => {
    setInputStr(data);
  };

  const handleSubmit = () => {
    if (inputStr.trim() === "") {
      setInputError(true);
      return;
    }
    setInputError(false);
    console.log("Input String:", inputStr);

    const result = testString(inputStr);
    if (result) {
      setAccept(true);
      setNormal(false);
    } else {
      setReject(true);
      setNormal(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <p className="font-roboto-bold">Enter a string to test</p>
        {inputError && <p className={style.error}>Please enter a string</p>}
      </div>
      <div className="w-full flex gap-3">
        <Input
          width="w-full"
          placeholder="e.g., aabba"
          value={inputStr}
          onChange={handleInputStr}
        />
        <Button content={"Test"} isPrimary={true} onClick={handleSubmit} />
      </div>
      {normal && (
        <div className={`${style.result} ${style.normal}`}>
          Result appears here
        </div>
      )}
      {accept && (
        <div className={`${style.result} ${style.accept}`}>
          {inputStr} is accepted
        </div>
      )}
      {reject && (
        <div className={`${style.result} ${style.reject}`}>
          {inputStr} is rejected
        </div>
      )}
    </div>
  );
}
