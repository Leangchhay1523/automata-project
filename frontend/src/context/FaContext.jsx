// context/FaContext.js
import { createContext, useContext, useState } from "react";

// Create the context object
const FaContext = createContext();

// Custom hook to use the context
export const useFaContext = () => useContext(FaContext);

// Context Provider component
export const FaProvider = ({ children }) => {
  const [selectedFA, setSelectedFA] = useState(null);

  return (
    <FaContext.Provider value={{ selectedFA, setSelectedFA }}>
      {children}
    </FaContext.Provider>
  );
};
