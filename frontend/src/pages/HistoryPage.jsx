import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchHistory } from "../store/historySlice";

export default function HistoryPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { items, status, error } = useSelector((state) => state.history);

  useEffect(() => {
    if (token) {
      dispatch(fetchHistory());
    }
  }, [token, dispatch]);

  if (!token) {
    return (
      <div className="page">
        <p className="results-message">
          <Link to="/auth">Sign in</Link> to see your search history.
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <p className="page-intro">Your past searches.</p>

      {status === "loading" && <p className="results-message">Loading...</p>}
      {status === "failed" && <p className="results-message error">{error}</p>}
      {status === "succeeded" && items.length === 0 && (
        <p className="results-message">You haven't searched for anything yet.</p>
      )}

      <ul className="history-list">
        {items.map((entry, index) => (
          <li key={index} className="history-item">
            <Link to={`/search?q=${encodeURIComponent(entry.query)}`}>{entry.query}</Link>
            <span className="history-date">
              {new Date(entry.searched_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
