from flask import Blueprint, jsonify, request

from extensions import db
from models import Review

reviews_bp = Blueprint("reviews", __name__, url_prefix="/api/search/reviews")


@reviews_bp.route("", methods=["GET"])
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


@reviews_bp.route("", methods=["POST"])
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
