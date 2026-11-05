from typing import Optional, Any
from backend.app.core.config import settings

_supabase_client: Optional[Any] = None

def get_supabase_client() -> Optional[Any]:
    """Returns an authenticated Supabase client using service role key, or None if unconfigured."""
    global _supabase_client
    if _supabase_client is None:
        if settings.SUPABASE_URL and settings.SUPABASE_SERVICE_ROLE_KEY:
            try:
                from supabase import create_client
                _supabase_client = create_client(
                    settings.SUPABASE_URL,
                    settings.SUPABASE_SERVICE_ROLE_KEY
                )
            except Exception as e:
                print(f"[Supabase Init Warning] {e}")
                _supabase_client = None
    return _supabase_client
