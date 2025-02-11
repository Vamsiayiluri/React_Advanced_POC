import { useState, useDeferredValue, useEffect } from "react";

const ListComp = ({ value }: { value: string }) => {
  // const deferredValue = useDeferredValue(value); // Delay updating this value
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  useEffect(() => {
    setFilteredItems(items.filter((item) => item.includes(value)));
  }, [value]);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListComp;
