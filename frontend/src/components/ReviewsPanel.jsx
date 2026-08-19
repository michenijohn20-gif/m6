import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SITES } from "../constants";
import { addReview, fetchReviews } from "../store/reviewsSlice";
import "../styles/reviews.css";
import "../styles/layout.css";

export default function ReviewsPanel({ query }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.reviews);
  const [form, setForm] = useState({
    shop: SITES[0],
    author: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (query) {
      dispatch(fetchReviews(query));
    }
  }, [query, dispatch]);

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.comment.trim()) return;

    await dispatch(
      addReview({
        query,
        shop: form.shop,
        author: form.author.trim(),
        comment: form.comment.trim(),
        rating: Number(form.rating),
      })
    );
    setForm({ ...form, comment: "" });
  };

  if (!query) return null;

  return (
    <div className="reviews-panel">
      <h4>Reviews for "{query}"</h4>

      {status === "loading" && <p className="results-message">Loading reviews...</p>}
      {status === "succeeded" && items.length === 0 && (
        <p className="results-message">No reviews yet. Be the first to leave one.</p>
      )}

      <ul className="reviews-list">
        {items.map((review, index) => (
          <li key={index} className="review-item">
            <div className="review-item-head">
              <span className="review-shop">{review.shop}</span>
              <span className="review-rating">{"★".repeat(Math.round(review.rating))}</span>
            </div>
            <p className="review-comment">{review.comment}</p>
            <span className="review-author">— {review.author}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-form-row">
          <select value={form.shop} onChange={handleChange("shop")}>
            {SITES.map((site) => (
              <option key={site} value={site}>
                {site}
              </option>
            ))}
          </select>
          <select value={form.rating} onChange={handleChange("rating")}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={form.author}
            onChange={handleChange("author")}
          />
        </div>
        <textarea
          placeholder="Share your experience with this product..."
          value={form.comment}
          onChange={handleChange("comment")}
          rows={2}
          required
        />
        <button type="submit">Post review</button>
      </form>
    </div>
  );
}
