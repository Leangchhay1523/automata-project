import Button from "../common/Button";
import { useState, useEffect } from "react";
import SingleSelectionDropDown from "../common/SingleSelectionDropDown";
import { TiTick } from "react-icons/ti";
import Table from "../common/Table";
import { getEveryFa, createMinimizedDFA, getFAById } from "@/api/api.js";

export default function FaMinimizer() {
  const [inputError, setInputError] = useState(false);
  const [reset, setReset] = useState(false);
  const [selectedDFA, setSelectedDFA] = useState(""); // NFA ID
  const [showResult, setShowResult] = useState(false);
  const [allFa, setAllFa] = useState([]);
  const [selectedNFAData, setSelectedNFAData] = useState(null);
  const [minimizedDFA, setMinimizedDFA] = useState(null);

  const style = {
    error: "text-red-500 font-semibold",
  };

  const minimizeDFA = async (dfaId) => {
    try {
      const response = await createMinimizedDFA(dfaId);
      console.log("Converted DFA Response:", response);
      setMinimizedDFA(response);
    } catch (error) {
      console.error("Error converting NFA to DFA:", error);
      setInputError(true);
    }
  };

  const getDfaDataById = async (id) => {
    try {
      const faData = await getFAById(id);
      console.log("Fetched FA Data:", faData);
      setSelectedNFAData(faData);
    } catch (error) {
      console.error("Error fetching FA by ID:", error);
    }
  };

  useEffect(() => {
    const fetchFAs = async () => {
      try {
        const fa = await getEveryFa();
        const filteredFa = fa.filter((item) => item.type === "DFA");
        setAllFa(filteredFa);
      } catch (error) {
        console.log("Error fetching FAs:", error);
      }
    };
    fetchFAs();
  }, []);

  const handleSubmit = async () => {
    if (selectedDFA.trim() === "") {
      setInputError(true);
      return;
    }
    console.log("Selected NFA ID:", selectedDFA);
    await minimizeDFA(selectedDFA);
    await getDfaDataById(selectedDFA);
    setShowResult(true);
    setInputError(false);
    setReset(true);
    setSelectedDFA("");
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
        option={allFa}
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
      {showResult && (
        <div className="flex flex-col gap-3">
          <p className="font-raleway-bold w-full text-[20px]">Result</p>
          <div>
            <p>Original DFA: {selectedNFAData.name}</p>
            {selectedNFAData && <Table fa={selectedNFAData} />}
          </div>
          <div>
            <p>Minimized DFA</p>
            {minimizedDFA && <Table fa={minimizedDFA} />}
          </div>
        </div>
      )}
    </div>
  );
}
