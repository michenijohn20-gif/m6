const formatKsh = (amount) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ProductCard({ listing }) {
  return (
    <div className="product-card">
      <h3>{listing.site}</h3>
      <p className="price">Ksh {formatKsh(listing.price)}</p>
      <p>
        Rating: {listing.rating} ({listing.num_ratings} ratings)
      </p>
      <p>Delivery: Ksh {formatKsh(listing.delivery_cost)}</p>
      <p>{listing.pay_on_delivery ? "Pay after delivery" : "Pay before delivery"}</p>
      <div className="score-row">
        <span className="score mb">MB {listing.mb_score}%</span>
        <span className="score cb">CB {listing.cb_score}%</span>
      </div>
    </div>
  );
}
