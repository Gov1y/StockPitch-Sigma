// StockDataContext
import React, { createContext, useContext, useState } from "react";

interface StockDataContextType {
  stockData: any;
  setStockData: React.Dispatch<React.SetStateAction<any>>;
}

const StockDataContext = createContext<StockDataContextType | null>(null);

export const StockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stockData, setStockData] = useState<any>(null);
  return (
    <StockDataContext.Provider value={{ stockData, setStockData }}>
      {children}
    </StockDataContext.Provider>
  );
};

export const useStockData = () => {
  const context = useContext(StockDataContext);
  if (!context) {
    throw new Error("useStockData must be used within a StockDataProvider");
  }
  return context;
};
