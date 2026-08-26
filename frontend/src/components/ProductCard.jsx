import { useEffect, useRef, useState } from "react";

import "../styles/search.css";

const formatKsh = (amount) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Some upstream image CDNs stall indefinitely instead of erroring, which
// leaves a plain <img> spinner forever — give it a few seconds, then give up.
const IMAGE_LOAD_TIMEOUT_MS = 5000;

function ImagePlaceholder() {
  return (
    <div className="product-card-image product-card-image-placeholder">
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
        <path
          d="M4 17l5-5 4 4 3-3 4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>No image</span>
    </div>
  );
}

function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(!src);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!src) return undefined;
    const timer = setTimeout(() => {
      if (!loadedRef.current) setFailed(true);
    }, IMAGE_LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [src]);

  if (failed) return <ImagePlaceholder />;

  return (
    <img
      src={src}
      alt={alt}
      className="product-card-image"
      onLoad={() => {
        loadedRef.current = true;
      }}
      onError={() => setFailed(true)}
    />
  );
}

export default function ProductCard({ listing }) {
  const CardTag = listing.url ? "a" : "div";
  const linkProps = listing.url
    ? { href: listing.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <CardTag className="product-card" {...linkProps}>
      <ProductImage src={listing.image} alt={listing.title} />
      <h3>{listing.site}</h3>
      <p className="product-card-title">{listing.title}</p>
      <p className="price">Ksh {formatKsh(listing.price)}</p>
      <p>
        Rating: {listing.rating} ({listing.num_ratings} ratings)
      </p>
      <p>{listing.pay_on_delivery ? "Pay after delivery" : "Pay before delivery"}</p>
      <div className="score-row">
        <span className="score mb">MB {listing.mb_score}%</span>
        <span className="score cb">CB {listing.cb_score}%</span>
      </div>
      {listing.url && (
        <span className="product-card-link">View on {listing.site} →</span>
      )}
    </CardTag>
  );
}
