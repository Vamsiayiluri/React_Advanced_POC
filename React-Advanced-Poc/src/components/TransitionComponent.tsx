import React, { useDeferredValue, useState, useTransition } from "react";
import ListComp from "./ListComp";

const TransitionComponent: React.FC = () => {
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const [query3, setQuery3] = useState("");

  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query2);
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    startTransition(() => {
      setFilteredItems(
        items.filter((item) => item.includes(event.target.value))
      );
    });
  };
  const handleSearch2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery2(event.target.value);
  };
  const handleSearch3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery3(event.target.value);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search items..."
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ul>
            {filteredItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={query2}
          onChange={(e) => setQuery2(e.target.value)}
          placeholder="Search items..."
        />
        {query2 && (
          <div>
            <ListComp value={deferredQuery}></ListComp>
          </div>
        )}
      </div>
      <div>
        <input
          type="text"
          value={query3}
          onChange={(e) => setQuery3(e.target.value)}
          placeholder="Search items..."
        />
        {query3 && (
          <div>
            <ListComp value={query3}></ListComp>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransitionComponent;
