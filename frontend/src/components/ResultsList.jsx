import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";

export default function ResultsList() {
  const { results, status, error, query } = useSelector((state) => state.search);

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
    <div className="results-list">
      {results.map((listing, index) => (
        <ProductCard key={`${listing.site}-${index}`} listing={listing} />
      ))}
    </div>
  );
}
