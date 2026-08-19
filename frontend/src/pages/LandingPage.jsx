import { Link } from "react-router-dom";

import "../styles/landing.css";

const EXAMPLES = ["Samsung A51", "Bluedio Headphones"];

const FEATURES = [
  {
    title: "Marginal Benefit (MB%)",
    body: "Weighted score combining price competitiveness, review quality, delivery cost, and payment risk.",
  },
  {
    title: "Cost-Benefit (CB)",
    body: "MB score per unit of total spend. Helps you find the sweetest value-for-money option.",
  },
  {
    title: "Custom Weights",
    body: "Adjust how much price, rating, or delivery matters to you. Rankings update instantly.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <h1>Compare Smarter</h1>
        <p>
          BlueCart ranks products from Amazon, eBay, Shopify, and Alibaba using a
          Marginal Benefit (MB) and Cost-Benefit (CB) score — factoring price,
          delivery, ratings, and payment safety.
        </p>
        <div className="hero-examples">
          {EXAMPLES.map((example) => (
            <Link
              key={example}
              className="hero-chip"
              to={`/search?q=${encodeURIComponent(example)}`}
            >
              Try: {example}
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-grid">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
