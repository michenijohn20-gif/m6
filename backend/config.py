import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-jwt")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/bluecart"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    RAPIDAPI_KEY = os.environ.get("RAPIDAPI_KEY", "")
    RAPIDAPI_AMAZON_HOST = os.environ.get(
        "RAPIDAPI_AMAZON_HOST", "real-time-amazon-data.p.rapidapi.com"
    )
    RAPIDAPI_ALIEXPRESS_HOST = os.environ.get(
        "RAPIDAPI_ALIEXPRESS_HOST", "aliexpress-datahub.p.rapidapi.com"
    )

    EBAY_CLIENT_ID = os.environ.get("EBAY_CLIENT_ID", "")
    EBAY_CLIENT_SECRET = os.environ.get("EBAY_CLIENT_SECRET", "")

    # No live FX API configured — fixed approximate rate, update as needed.
    USD_TO_KES_RATE = float(os.environ.get("USD_TO_KES_RATE", "130"))
