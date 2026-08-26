import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";
import "../styles/search.css";
import "../styles/layout.css";

const SORTERS = {
  best: { label: "Best match", compare: (a, b) => b.mb_score - a.mb_score },
  price_asc: { label: "Price: Low to High", compare: (a, b) => a.price - b.price },
  price_desc: { label: "Price: High to Low", compare: (a, b) => b.price - a.price },
  rating_desc: { label: "Rating: High to Low", compare: (a, b) => b.rating - a.rating },
  value: { label: "Best value (CB)", compare: (a, b) => b.cb_score - a.cb_score },
};

export default function ResultsList() {
  const { results, status, error, query } = useSelector((state) => state.search);
  const [sortKey, setSortKey] = useState("best");

  const sortedResults = useMemo(
    () => [...results].sort(SORTERS[sortKey].compare),
    [results, sortKey]
  );

  if (status === "loading") {
    return <p className="results-message">Searching...</p>;
  }
  if (status === "failed") {
    return <p className="results-message error">Couldn't load results: {error}</p>;
  }
  if (status === "succeeded" && results.length === 0) {
    return <p className="results-message">No results for "{query}".</p>;
  }
  if (status === "idle") {
    return <p className="results-message">Search for a product to compare e-shops.</p>;
  }

  return (
    <div className="results-panel">
      <div className="results-header">
        <span className="results-count">
          {results.length} result{results.length === 1 ? "" : "s"}
        </span>
        <label className="results-sort">
          Sort by
          <select value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
            {Object.entries(SORTERS).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="results-list">
        {sortedResults.map((listing, index) => (
          <ProductCard key={`${listing.site}-${listing.url ?? index}`} listing={listing} />
        ))}
      </div>
    </div>
  );
}
