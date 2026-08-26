import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { rerankResults } from "../store/searchSlice";
import { setPriceRange, setWeight } from "../store/filtersSlice";
import "../styles/search.css";

const WEIGHTS_INFO = {
  rating: {
    label: "Product rating",
    hint: "Higher = favor listings with better star ratings",
  },
  trust: {
    label: "Payment safety",
    hint: "Higher = favor listings that let you pay after delivery",
  },
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

  const clamp = (value, low, high) => Math.min(Math.max(value, low), high);

  const handleMinPrice = (value) => {
    const next = clamp(Number(value), priceBounds.min, priceRange.max);
    dispatch(setPriceRange({ min: next, max: priceRange.max }));
  };

  const handleMaxPrice = (value) => {
    const next = clamp(Number(value), priceRange.min, priceBounds.max);
    dispatch(setPriceRange({ min: priceRange.min, max: next }));
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

  const span = priceBounds.max - priceBounds.min || 1;
  const fillStart = ((priceRange.min - priceBounds.min) / span) * 100;
  const fillEnd = ((priceRange.max - priceBounds.min) / span) * 100;

  return (
    <div className="filter-panel">
      <h4>Rank by what matters to you</h4>
      <p className="filter-intro">
        Drag a slider right to make that factor count for more in the ranking.
      </p>

      <div className="filter-block">
        <span className="filter-label">Price range</span>
        <div className="price-slider">
          <div className="price-slider-track">
            <div
              className="price-slider-fill"
              style={{ left: `${fillStart}%`, right: `${100 - fillEnd}%` }}
            />
          </div>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step="1"
            value={priceRange.min}
            onChange={(event) => handleMinPrice(event.target.value)}
            aria-label="Minimum price"
          />
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step="1"
            value={priceRange.max}
            onChange={(event) => handleMaxPrice(event.target.value)}
            aria-label="Maximum price"
          />
        </div>
        <div className="price-inputs">
          <label>
            Min
            <input
              type="number"
              value={priceRange.min}
              min={priceBounds.min}
              max={priceRange.max}
              onChange={(event) => handleMinPrice(event.target.value)}
            />
          </label>
          <span className="price-inputs-sep">–</span>
          <label>
            Max
            <input
              type="number"
              value={priceRange.max}
              min={priceRange.min}
              max={priceBounds.max}
              onChange={(event) => handleMaxPrice(event.target.value)}
            />
          </label>
        </div>
      </div>

      {Object.keys(weights).map((key) => (
        <div key={key} className="filter-block">
          <div className="filter-row">
            <span className="filter-label">{WEIGHTS_INFO[key].label}</span>
            <span className="filter-value">{Math.round(weights[key] * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={weights[key]}
            onChange={(event) => handleChange(key, event.target.value)}
            aria-label={WEIGHTS_INFO[key].label}
          />
          <p className="filter-hint">{WEIGHTS_INFO[key].hint}</p>
        </div>
      ))}

      <button type="button" onClick={handleApply}>
        Apply filters
      </button>
    </div>
  );
}
