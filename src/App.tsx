import { useEffect, useRef, useState } from "react";
import Card from "./Components/Card";
import Search from "./Components/Search";
import {
  getCurrentPinnedToLocalStorage,
  setCurrentPinnedToLocalStorage,
} from "./utils";
import { SearchData } from "./types";
import MeasurementSystemSelect from "./Components/MeasurementSystemSelect";
import { DataProvider } from "./Provider/DataProvider";

function App() {
  const [added, setAdded] = useState<SearchData[]>([]);
  useEffect(() => {
    const persistingData = getCurrentPinnedToLocalStorage();
    if (!Object.keys(added).length && persistingData) {
      setAdded(JSON.parse(persistingData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentlyDragging = useRef<number>(0);
  const currentlyDraggingOver = useRef<number>(0);
  const handleSort = () => {
    const cloned = [...added];
    const currentTemp = cloned[currentlyDragging.current];
    cloned[currentlyDragging.current] = cloned[currentlyDraggingOver.current];
    cloned[currentlyDraggingOver.current] = currentTemp;
    setAdded(cloned);
    setCurrentPinnedToLocalStorage(JSON.stringify(cloned));
  };

  return (
    <DataProvider>
      <div className="app">
        <MeasurementSystemSelect />
        <Search added={added} setAdded={setAdded} />
        <div className="main__container">
          <div className="result__container">
            {added.map((item: SearchData, index: number) => (
              <div
                draggable
                onDragStart={() => (currentlyDragging.current = index)}
                onDragEnter={() => (currentlyDraggingOver.current = index)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={handleSort}
                key={item.id}
                className="card__outer"
              >
                <Card data={item} setAdded={setAdded} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
