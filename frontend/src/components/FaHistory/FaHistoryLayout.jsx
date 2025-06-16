import React from "react";
import FACard from "./FaCard";

const FAHistoryLayout = ({ history }) => {
  //TODO: Filter function
  const filter = (filterBy) => {
    if (filterBy === "all");
    else if (filterBy === "input");
    else if (filterBy === "minimize");
    else if (filterBy === "nfatodfa");
  };

  return (
    <div className="w-full p-2 flex flex-col gap-2">
      <div className="w-full h-max flex gap-3">
        <FilterBtn onclick={() => filter("all")} content={"ALL"} />
        <FilterBtn onclick={() => filter("input")} content={"Input FA"} />
        <FilterBtn
          onclick={() => filter("minimize")}
          content={"Minimized DFA"}
        />
        <FilterBtn onclick={() => filter("nfatodfa")} content={"NFA → DFA"} />
      </div>
      <div className="flex gap-4 py-2 w-full overflow-x-auto ">
        {history.map((item, index) => (
          <FACard key={index} index={index} data={item} />
        ))}
      </div>
    </div>
  );
};

const FilterBtn = ({ onclick, content }) => {
  return (
    <button
      onClick={onclick}
      className="px-5 py-1 rounded-md bg-white text-gray-800 border cursor-pointer border-gray-300 hover:bg-gray-100 transition"
    >
      {content}
    </button>
  );
};

export default FAHistoryLayout;
