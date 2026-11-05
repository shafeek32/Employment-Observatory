import hashlib
import secrets
import httpx
from backend.app.core.config import settings

def generate_ip_hash(ip: str) -> str:
    """Computes a one-way salted SHA-256 hash of the client IP."""
    raw = f"{ip}:{settings.DAILY_PEPPER}".encode("utf-8")
    return hashlib.sha256(raw).hexdigest()

def generate_deletion_key() -> str:
    """Generates a random 16-character alphanumeric key for anonymous deletion rights."""
    return secrets.token_hex(8)

async def verify_turnstile_token(token: str, ip: str) -> bool:
    """Verifies Cloudflare Turnstile token with Cloudflare API."""
    if not settings.TURNSTILE_SECRET_KEY:
        # In development without turnstile key, pass through
        return True
        
    url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
    data = {
        "secret": settings.TURNSTILE_SECRET_KEY,
        "response": token,
        "remoteip": ip
    }
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(url, data=data, timeout=5.0)
            result = resp.json()
            return result.get("success", False)
        except Exception:
            return False
