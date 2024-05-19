// Create a context and consume data from there

import { ReactNode, createContext, useContext, useState } from "react";
import { MeasurementSystemtypes } from "../types";

const DataContext = createContext<any>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [currentMeasurementSystem, setCurrentMeasurementSystem] =
    useState<MeasurementSystemtypes>("metric");

  const isMetric = currentMeasurementSystem === "metric";

  return (
    <DataContext.Provider
      value={{
        isMetric,
        currentMeasurementSystem,
        setCurrentMeasurementSystem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume the context
export const useData = () => useContext(DataContext);
