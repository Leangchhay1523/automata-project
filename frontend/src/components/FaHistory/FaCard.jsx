// FACard.jsx
import React from "react";
import { Download, Trash2 } from "lucide-react";

const FACard = ({ data }) => {
  return (
    <div className="min-w-[250px] max-w-[250px] p-4 bg-white rounded-md shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{data.title}</h3>
        <span className="text-sm text-gray-500">{data.type}</span>
      </div>
      <div className="flex justify-between mt-4">
        <button className="inline-flex items-center gap-1 text-sm text-blue-500 cursor-pointer">
          <Download className="w-4 h-4" />
          <span>Load</span>
        </button>
        <button className="inline-flex items-center gap-1 text-sm text-red-500 cursor-pointer">
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default FACard;
