import time
from fastapi import APIRouter, Request, HTTPException, status
from backend.app.schemas.survey import SurveySubmissionCreate, SurveySubmissionResponse
from backend.app.db.queries import save_survey_submission
from backend.app.core.security import verify_turnstile_token
from backend.app.core.rate_limit import limiter
from backend.app.core.config import settings

router = APIRouter()

@router.post(
    "/submit",
    response_model=SurveySubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit voluntary employment or unemployment survey"
)
@limiter.limit(settings.RATE_LIMIT_SUBMIT)
async def submit_survey(
    request: Request,
    payload: SurveySubmissionCreate
):
    client_ip = request.client.host if request.client else "127.0.0.1"
    
    # 1. Anti-abuse: Completion Velocity Filter (reject under 3 seconds)
    if payload.form_start_epoch_ms:
        current_epoch_ms = int(time.time() * 1000)
        elapsed_seconds = (current_epoch_ms - payload.form_start_epoch_ms) / 1000.0
        if elapsed_seconds < 3.0:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Form completion velocity threshold unmet. Submission rejected."
            )
            
    # 2. Anti-abuse: Cloudflare Turnstile token validation
    if payload.turnstile_token:
        is_human = await verify_turnstile_token(payload.turnstile_token, client_ip)
        if not is_human:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Bot verification challenge failed."
            )
            
    # 3. Store record securely and generate deletion key
    deletion_key = await save_survey_submission(payload, client_ip)
    
    return SurveySubmissionResponse(
        success=True,
        message="Thank you. Your voluntary submission has been anonymously contributed to India's public research dataset.",
        deletion_key=deletion_key,
        status=payload.status
    )
