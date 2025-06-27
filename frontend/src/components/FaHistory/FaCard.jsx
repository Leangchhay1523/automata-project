// FACard.jsx
import { useFaContext } from "../../context/FaContext";
import { Download, Trash2 } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import FATablePopup from "../common/FaTablePopup";
import { useState } from "react";

const FACard = ({ data, onDelete }) => {
  const { setSelectedFA } = useFaContext();
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="min-w-[250px] max-w-[250px] p-4 bg-white rounded-md shadow-md border border-gray-200 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-md text-gray-800">{data.name}</h3>
        <span className="text-sm text-gray-500">{data.type}</span>
      </div>
      {showTable && (
        <FATablePopup fa={data} onClose={() => setShowTable(false)} />
      )}
      <div className="flex justify-between mt-4">
        <button
          className="inline-flex items-center gap-1 text-sm text-blue-500 cursor-pointer"
          onClick={() => setSelectedFA({ id: data.id, name: data.name })}
        >
          <Download className="w-4 h-4" />
          Load
        </button>
        <button
          className="inline-flex items-center gap-1 text-sm text-green-500 cursor-pointer"
          onClick={() => setShowTable(true)}
        >
          <IoIosSearch className="w-4 h-4" />
          View
        </button>
        <button
          className="inline-flex items-center gap-1 text-sm text-red-500 cursor-pointer"
          onClick={() => onDelete(data.id)}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default FACard;
