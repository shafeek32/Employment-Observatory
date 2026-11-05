from fastapi import APIRouter, Request, Response
from backend.app.schemas.analytics import DashboardOverviewResponse
from backend.app.db.queries import fetch_dashboard_overview
from backend.app.core.rate_limit import limiter
from backend.app.core.config import settings

router = APIRouter()

@router.get(
    "/overview",
    response_model=DashboardOverviewResponse,
    summary="Get aggregated public dashboard intelligence"
)
@limiter.limit(settings.RATE_LIMIT_ANALYTICS)
async def get_dashboard_overview(request: Request, response: Response):
    # Set Cache-Control headers for Edge/CDN caching (5 minutes)
    response.headers["Cache-Control"] = "public, max-age=60, s-maxage=300"
    data = await fetch_dashboard_overview()
    return data
