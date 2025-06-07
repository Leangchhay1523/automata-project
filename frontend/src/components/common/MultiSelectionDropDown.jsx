import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function MultiSelectDropdown({
  selectedIcon: SelectedIcon,
  className = "",
  option,
  sendResult,
  reset,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedOptions([]);
      setIsOpen(false);
    }
  }, [reset]);

  useEffect(() => {
    sendResult(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`${className} w-full px-4 py-2 border border-gray-300 rounded-sm bg-white text-left flex justify-between items-center shadow-sm hover:shadow-md transition`}
      >
        <span className="truncate">{selectedOptions.join(", ")}</span>
        <FaChevronDown className="text-gray-500" size={14} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {option.map((option) => {
            const isSelected = selectedOptions.includes(option);
            return (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 ${
                  isSelected ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {isSelected && SelectedIcon && (
                  <span className="text-[#2e2e2e] mr-2">
                    <SelectedIcon size={14} />
                  </span>
                )}
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
