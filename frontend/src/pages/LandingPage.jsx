import { Link } from "react-router-dom";

import "../styles/landing.css";

const EXAMPLES = ["Samsung A51", "Bluedio Headphones", "Anker Soundcore 2"];
const MARKETPLACES = [
  { name: "Amazon", logo: "/amazon-logo.png" },
  { name: "AliExpress", logo: null },
  { name: "eBay", logo: "/ebay-logo.png" },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 20l-4.8-4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11.3 3.6l7.1 7.1a2 2 0 0 1 0 2.8l-6 6a2 2 0 0 1-2.8 0l-7.1-7.1A2 2 0 0 1 2 11.1V5a2 2 0 0 1 2-2h6.1a2 2 0 0 1 1.2.6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="8" r="1.4" fill="currentColor" />
      <path
        d="M13.5 12.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M6 21h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 5.5L4.5 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 5.5L19.5 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4.5 8L2 13a2.8 2.8 0 0 0 5 0L4.5 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 8L17 13a2.8 2.8 0 0 0 5 0L19.5 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h9M17 6h3M4 12h3M9 12h11M4 18h13M21 18h-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="13" cy="6" r="2.1" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="12" r="2.1" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="2.1" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const FEATURES = [
  {
    metric: "01",
    title: "Marginal Benefit (MB%)",
    body: "Weighted score combining price competitiveness, review quality, and payment risk.",
    Icon: TagIcon,
  },
  {
    metric: "02",
    title: "Cost-Benefit (CB)",
    body: "MB score per unit of total spend. Helps you find the sweetest value-for-money option.",
    Icon: ScaleIcon,
  },
  {
    metric: "03",
    title: "Custom Weights",
    body: "Adjust how much price, rating, or payment safety matters to you. Rankings update instantly.",
    Icon: SlidersIcon,
  },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <span className="hero-glyph" aria-hidden="true">
          %
        </span>

        <div className="hero-copy">
          <h1>Find the product that is actually worth it.</h1>
          <p>
            BlueCart ranks products from Amazon, AliExpress, and eBay
            using Marginal Benefit and Cost-Benefit scores that factor price,
            ratings, and payment safety.
          </p>
          <div className="hero-actions">
            <Link className="hero-primary" to="/search">
              Start comparing
            </Link>
          </div>

          <div className="hero-suggestions">
            <span className="hero-suggestions-label">Try searching</span>
            <div className="hero-suggestions-list" aria-label="Example searches">
              {EXAMPLES.map((example) => (
                <Link
                  key={example}
                  className="hero-chip"
                  to={`/search?q=${encodeURIComponent(example)}`}
                >
                  <SearchIcon />
                  {example}
                </Link>
              ))}
            </div>
          </div>

          <div className="hero-marketplaces">
            <span className="hero-marketplaces-label">Compared across</span>
            <div className="hero-marketplaces-list">
              {MARKETPLACES.map(({ name, logo }) =>
                logo ? (
                  <img
                    key={name}
                    src={logo}
                    alt={name}
                    className="hero-marketplace-logo"
                  />
                ) : (
                  <span key={name} className="hero-marketplace-text">
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="feature-panel">
        <div className="feature-grid">
          {FEATURES.map(({ metric, title, body, Icon }) => (
            <div key={title} className="feature-card">
              <div className="feature-card-top">
                <span className="feature-icon">
                  <Icon />
                </span>
                <span className="feature-metric">{metric}</span>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
