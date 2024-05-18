import { useEffect, useRef, useState } from "react";
import Card from "./Components/Card";
import Search from "./Components/Search";
import {
  getCurrentPinnedToLocalStorage,
  setCurrentPinnedToLocalStorage,
} from "./utils";

function App() {
  //TO-DO
  /* 
  1.Get And Use Data From API,
  2.Create a skeleton card
  3.Implement Add Functionality
  4.Implement Drag and re-order Functionality
  5.Improve Style
  */

  const [added, setAdded] = useState([]);

  useEffect(() => {
    const persistingData = getCurrentPinnedToLocalStorage();
    if (!Object.keys(added).length && persistingData) {
      setAdded(JSON.parse(persistingData));
    }
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
    <div className="app">
      <Search added={added} setAdded={setAdded} />
      <div className="main__container">
        <div className="result__container">
          {added.map((item: any, index: number) => (
            <div
              draggable
              onDragStart={() => (currentlyDragging.current = index)}
              onDragEnter={() => (currentlyDraggingOver.current = index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={handleSort}
              key={item.id}
            >
              <Card data={item} setAdded={setAdded} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
