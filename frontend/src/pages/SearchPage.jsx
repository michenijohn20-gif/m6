import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import FilterPanel from "../components/FilterPanel";
import ResultsList from "../components/ResultsList";
import ReviewsPanel from "../components/ReviewsPanel";
import { runSearch } from "../store/searchSlice";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      dispatch(runSearch(query));
    }
  }, [query, dispatch]);

  return (
    <div className="page">
      <p className="page-intro">
        {query ? (
          <>
            Results for <strong>"{query}"</strong>
          </>
        ) : (
          "Search for a product using the bar above."
        )}
      </p>
      <div className="page-body">
        <FilterPanel />
        <ResultsList />
      </div>
      <ReviewsPanel query={query} />
    </div>
  );
}
