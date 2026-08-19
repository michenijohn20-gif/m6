import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { rerankResults } from "../store/searchSlice";
import { setPriceRange, setWeight } from "../store/filtersSlice";

const LABELS = {
  rating: "Rating",
  delivery_cost: "Delivery cost",
  trust: "Payment trust",
};

export default function FilterPanel() {
  const dispatch = useDispatch();
  const weights = useSelector((state) => state.filters.weights);
  const priceRange = useSelector((state) => state.filters.priceRange);
  const allResults = useSelector((state) => state.search.allResults);

  const priceBounds = useMemo(() => {
    if (allResults.length === 0) {
      return { min: 0, max: 0 };
    }
    const prices = allResults.map((listing) => listing.price);
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [allResults]);

  // Reset the selected range to the full span whenever a new search comes in.
  useEffect(() => {
    dispatch(setPriceRange(priceBounds));
  }, [priceBounds, dispatch]);

  const handleChange = (key, value) => {
    dispatch(setWeight({ key, value: Number(value) }));
  };

  const handleMinPrice = (value) => {
    dispatch(setPriceRange({ min: Math.min(Number(value), priceRange.max), max: priceRange.max }));
  };

  const handleMaxPrice = (value) => {
    dispatch(setPriceRange({ min: priceRange.min, max: Math.max(Number(value), priceRange.min) }));
  };

  const handleApply = () => {
    if (allResults.length === 0) {
      return;
    }
    const filtered = allResults.filter(
      (listing) => listing.price >= priceRange.min && listing.price <= priceRange.max
    );
    dispatch(rerankResults({ listings: filtered, weights }));
  };

  return (
    <div className="filter-panel">
      <h4>Rank by what matters to you</h4>

      <div className="filter-row filter-row--range">
        <span className="filter-label">Price range</span>
        <div className="price-range-inputs">
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step="1"
            value={priceRange.min}
            onChange={(event) => handleMinPrice(event.target.value)}
          />
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step="1"
            value={priceRange.max}
            onChange={(event) => handleMaxPrice(event.target.value)}
          />
        </div>
        <span className="filter-value">
          Ksh {priceRange.min.toLocaleString()} – Ksh {priceRange.max.toLocaleString()}
        </span>
      </div>

      {Object.keys(weights).map((key) => (
        <label key={key} className="filter-row">
          <span className="filter-label">{LABELS[key]}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={weights[key]}
            onChange={(event) => handleChange(key, event.target.value)}
          />
          <span className="filter-value">{weights[key]}</span>
        </label>
      ))}
      <button type="button" onClick={handleApply}>
        Apply filters
      </button>
    </div>
  );
}
