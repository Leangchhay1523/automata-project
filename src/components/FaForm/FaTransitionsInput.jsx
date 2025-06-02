import { useEffect, useState } from "react";
import SingleSelectionDropDown from "../common/SingleSelectionDropDown";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

export default function FaTransitionsInput({
  faState,
  faAlphabet,
  className,
  currentState,
  inputSymbol,
  nextState,
  onChange, // new: callback (field, value)
  onRemove, // new: callback to remove this transition
  index, // to identify which transition is changed
}) {
  // handler when dropdown changes:
  const handleChange = (field) => (value) => {
    onChange(index, field, value);
  };

  return (
    <div
      className={`${className} grid px-[10px] grid-cols-[1fr_1fr_1fr_0.5fr] gap-[10px] py-[5px] items-center`}
    >
      <SingleSelectionDropDown
        className="h-[40px]"
        selectedIcon={TiTick}
        option={faState}
        setOption={handleChange("currentState")}
        selected={currentState}
      />
      <SingleSelectionDropDown
        className="h-[40px]"
        selectedIcon={TiTick}
        option={faAlphabet}
        setOption={handleChange("inputSymbol")}
        selected={inputSymbol}
      />
      <SingleSelectionDropDown
        className="h-[40px]"
        selectedIcon={TiTick}
        option={faState}
        setOption={handleChange("nextState")}
        selected={nextState}
      />
      <RxCross2
        className="cursor-pointer justify-self-end"
        onClick={() => onRemove(index)}
      />
    </div>
  );
}
