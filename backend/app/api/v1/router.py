from fastapi import APIRouter
from backend.app.api.v1.endpoints import surveys, analytics, lookups

api_router = APIRouter()
api_router.include_router(surveys.router, prefix="/surveys", tags=["surveys"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(lookups.router, prefix="/lookups", tags=["lookups"])
