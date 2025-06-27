import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function SingleSelectionDropDown({
  selectedIcon: SelectedIcon,
  className = "",
  option, // Array
  setOption,
  reset,
  placeholder,
  showFA,
  faType,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (reset) {
      setSelected("");
      setIsOpen(false);
    }
  }, [reset]);

  const findSelectedOption = (id) => {
    return option.find((opt) => opt.id === id) || { name: "" };
  };

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
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full h-full px-4 py-2 border border-gray-300 rounded-sm bg-white cursor-pointer text-left flex justify-between items-center shadow-sm hover:shadow-sm transition"
      >
        <span>
          {showFA
            ? selected
              ? `(${faType}) ${findSelectedOption(selected).name}`
              : placeholder
            : selected || placeholder}
        </span>
        <FaChevronDown className="text-gray-500" size={14} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {option ? (
            showFA ? (
              option.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option.id)}
                  className={`px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 ${
                    selected === option.id ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {selected === option.id && SelectedIcon && (
                    <span className="text-[#2e2e2e] mr-2">
                      <SelectedIcon size={14} />
                    </span>
                  )}
                  {`(${faType}) ${option.name}`}
                </div>
              ))
            ) : (
              option.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 ${
                    selected === option ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {selected === option && SelectedIcon && (
                    <span className="text-[#2e2e2e] mr-2">
                      <SelectedIcon size={14} />
                    </span>
                  )}
                  {option}
                </div>
              ))
            )
          ) : (
            <div className="hidden"></div>
          )}
        </div>
      )}
    </div>
  );
}
