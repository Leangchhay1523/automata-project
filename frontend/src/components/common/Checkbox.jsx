import { useState } from "react";

export default function CheckBox({ content, result, setResult }) {
  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
      <span
        className={`relative flex items-center justify-center h-5 w-5 border-2 rounded-sm transition-all duration-200
          ${
            result
              ? "bg-(--color-dark) border-(--color-dark)"
              : "bg-white border-gray-300"
          }`}
      >
        {result && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        <input
          type="checkbox"
          checked={result}
          onChange={() => setResult(!result)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </span>
      <span className="text-gray-800 text-md">{content}</span>
    </label>
  );
}
