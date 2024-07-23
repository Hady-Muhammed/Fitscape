import React, { createContext, FC, useContext, useState } from "react";

// Define the shape of the context value
interface ScrollContextValue {
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
}

// Use the defined interface as the generic parameter for createContext
const ScrollContext = createContext<ScrollContextValue | undefined>(undefined);

export const useScrollContext = (): ScrollContextValue => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ScrollProvider: FC<any> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const updateScrollPosition = (position: number) => {
    setScrollPosition(position);
  };

  return (
    <ScrollContext.Provider value={{ scrollPosition, updateScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
};
