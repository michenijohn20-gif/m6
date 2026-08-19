from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity

from extensions import db
from models import Review, SearchHistory
from services import crawler, mb_cb

search_bp = Blueprint("search", __name__, url_prefix="/api/search")


@search_bp.route("", methods=["GET"])
def search():
    query = request.args.get("q", "").strip()
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400

    listings = crawler.fetch_all(query)
    ranked = mb_cb.rank_listings(listings)

    user_id = _optional_user_id()
    if user_id:
        db.session.add(SearchHistory(user_id=user_id, search_query=query))
        db.session.commit()

    return jsonify({"query": query, "results": ranked})


@search_bp.route("/filter", methods=["POST"])
def filter_search():
    """Re-rank a set of listings the client already has using custom weights."""
    body = request.get_json(force=True) or {}
    listings = body.get("listings", [])
    weights = body.get("weights", {})

    ranked = mb_cb.rank_listings(listings, weights)
    return jsonify({"results": ranked})


@search_bp.route("/reviews", methods=["GET"])
def reviews():
    query = request.args.get("q", "").strip()
    if not query:
        return jsonify({"error": "Query parameter 'q' is required"}), 400

    matches = (
        Review.query.filter_by(product_query=query)
        .order_by(Review.created_at.desc())
        .all()
    )
    return jsonify(
        {
            "query": query,
            "reviews": [
                {
                    "shop": r.shop,
                    "author": r.author,
                    "comment": r.comment,
                    "rating": r.rating,
                    "created_at": r.created_at.isoformat(),
                }
                for r in matches
            ],
        }
    )


@search_bp.route("/reviews", methods=["POST"])
def add_review():
    body = request.get_json(force=True) or {}
    query = body.get("query", "").strip()
    shop = body.get("shop", "").strip()
    author = body.get("author", "").strip() or "Anonymous"
    comment = body.get("comment", "").strip()
    rating = body.get("rating")

    if not query or not shop or not comment or rating is None:
        return jsonify({"error": "query, shop, comment and rating are required"}), 400

    try:
        rating = float(rating)
    except (TypeError, ValueError):
        return jsonify({"error": "rating must be a number"}), 400

    if not 1 <= rating <= 5:
        return jsonify({"error": "rating must be between 1 and 5"}), 400

    review = Review(
        product_query=query, shop=shop, author=author, comment=comment, rating=rating
    )
    db.session.add(review)
    db.session.commit()

    return (
        jsonify(
            {
                "shop": review.shop,
                "author": review.author,
                "comment": review.comment,
                "rating": review.rating,
                "created_at": review.created_at.isoformat(),
            }
        ),
        201,
    )


def _optional_user_id():
    """Return the JWT identity if a valid token was sent, else None (guest search)."""
    try:
        from flask_jwt_extended import verify_jwt_in_request

        verify_jwt_in_request(optional=True)
        identity = get_jwt_identity()
        return int(identity) if identity is not None else None
    except Exception:
        return None
