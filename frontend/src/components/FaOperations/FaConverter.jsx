import Button from "../common/Button";
import { useState, useEffect, use } from "react";
import SingleSelectionDropDown from "../common/SingleSelectionDropDown";
import { TiTick } from "react-icons/ti";
import Table from "../common/Table";
import { getEveryFa, createConvertedDFA, getFAById } from "@/api/api.js";

export default function FaConverter() {
  const [inputError, setInputError] = useState(false);
  const [reset, setReset] = useState(false);
  const [selectedNFA, setSelectedNFA] = useState(""); // NFA ID
  const [convertedDFA, setConvertedDFA] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [allFA, setAllFa] = useState([]);
  const [selectedDFAData, setSelectedDFAData] = useState(null);

  useEffect(() => {
    const fetchFAs = async () => {
      try {
        const fa = await getEveryFa();
        const filteredFa = fa.filter((item) => item.type === "NFA");
        setAllFa(filteredFa);
      } catch (error) {
        console.log("Error fetching FAs:", error);
      }
    };
    fetchFAs();
  }, []);

  const style = {
    error: "text-red-500 font-semibold",
  };

  const convertNFA = async (nfaId) => {
    try {
      const response = await createConvertedDFA(nfaId);
      console.log("Converted DFA Response:", response);
      setConvertedDFA(response);
    } catch (error) {
      console.error("Error converting NFA to DFA:", error);
      setInputError(true);
    }
  };

  const getFaDataById = async (id) => {
    try {
      const faData = await getFAById(id);
      console.log("Fetched FA Data:", faData);
      setSelectedDFAData(faData);
    } catch (error) {
      console.error("Error fetching FA by ID:", error);
    }
  };

  const handleSubmit = async () => {
    if (selectedNFA.trim() === "") {
      setInputError(true);
      return;
    }
    console.log("Selected NFA ID:", selectedNFA);
    await convertNFA(selectedNFA);
    await getFaDataById(selectedNFA);
    setShowResult(true);
    setInputError(false);
    setReset(true);
    setSelectedNFA("");
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
        option={allFA}
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
            <p>Original NFA: {selectedDFAData.name}</p>
            <Table fa={selectedDFAData} />
          </div>
          <div>
            <p>Converted DFA</p>
            <Table fa={convertedDFA} />
          </div>
        </div>
      )}
    </div>
  );
}
