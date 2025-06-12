import React from "react";
import FACard from "./FaCard";

const FAHistoryLayout = ({ history }) => {
  return (
    <div className="w-full overflow-x-auto p-2">
      <div className="flex w-[calc(250px*3+2rem)] space-x-4">
        {history.map((item, index) => (
          <FACard key={index} index={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default FAHistoryLayout;
