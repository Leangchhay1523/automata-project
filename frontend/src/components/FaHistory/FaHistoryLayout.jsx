import React, { useEffect } from "react";
import { useState } from "react";
import FACard from "./FaCard";
import {
  getAllFAs,
  deleteFAById,
  deleteMinimizedDFAById,
  deleteConvertedDFAById,
  getAllMinimizedDFAs,
  getAllConvertedDFAs,
  getEveryFa,
} from "@/api/api.js";

const FAHistoryLayout = () => {
  const [allFa, setAllFa] = useState([]);

  useEffect(() => {
    fetchFAs();
  }, []);

  const fetchFAs = async () => {
    try {
      const fa = await getEveryFa();
      console.log(fa);
      setAllFa(fa);
    } catch (error) {
      // Optionally handle error
      console.log("Error fetching FAs:", error);
    }
  };

  const fetchInputFAs = async () => {
    try {
      const fa = await getAllFAs();
      setAllFa(fa);
    } catch (error) {
      console.log("Error fetching input FAs:", error);
    }
  };

  const fetchMinimizedDFAs = async () => {
    try {
      const fa = await getAllMinimizedDFAs();
      setAllFa(fa);
    } catch (error) {
      console.log("Error fetching minimized DFAs:", error);
    }
  };

  const fetchConvertedDFAs = async () => {
    try {
      const fa = await getAllConvertedDFAs();
      setAllFa(fa);
    } catch (error) {
      console.log("Error fetching converted DFAs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (id[0] === "A") {
      await deleteFAById(id);
    } else if (id[0] === "M") {
      await deleteMinimizedDFAById(id);
    } else if (id[0] === "D") {
      await deleteConvertedDFAById(id);
    }
    setAllFa((prev) => prev.filter((fa) => fa.id !== id));
  };

  //TODO: Filter function
  const filter = (filterBy) => {
    if (filterBy === "all") {
      fetchFAs();
    } else if (filterBy === "input") {
      fetchInputFAs();
    } else if (filterBy === "minimize") {
      fetchMinimizedDFAs();
    } else if (filterBy === "nfatodfa") {
      fetchConvertedDFAs();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-raleway-bold w-full text-[20px]">
        Your Finite Automata
      </p>
      <div className="w-full h-max flex justify-start gap-3">
        <FilterBtn onclick={() => filter("all")} content={"ALL"} />
        <FilterBtn onclick={() => filter("input")} content={"Input FA"} />
        <FilterBtn
          onclick={() => filter("minimize")}
          content={"Minimized DFA"}
        />
        <FilterBtn onclick={() => filter("nfatodfa")} content={"NFA → DFA"} />
        <FilterBtn
          className={"ml-auto"}
          onclick={() => fetchFAs()}
          content={"Refresh"}
        />
      </div>
      {allFa.length > 0 ? (
        <div className="flex gap-4 py-2 w-full overflow-x-auto flex-nowrap">
          {allFa.map((item, index) => (
            <FACard
              key={index}
              index={index}
              data={item}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyFa />
      )}
    </div>
  );
};

const FilterBtn = ({ onclick, content, className }) => {
  return (
    <button
      onClick={onclick}
      className={`${className} px-2 text-sm py-1 rounded-md bg-white text-gray-800 border cursor-pointer border-gray-300 hover:bg-gray-100 transition`}
    >
      {content}
    </button>
  );
};

const EmptyFa = () => {
  return (
    <div className="w-full h-[200px] flex justify-center rounded-md items-center text-gray-500 border border-(--color-gray)">
      <p className="text-center">
        No Finite Automata found. Create one to see it here!
      </p>
    </div>
  );
};

export default FAHistoryLayout;
