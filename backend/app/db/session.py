import sys
import os
from typing import Optional, Any
from backend.app.core.config import settings

_supabase_client: Optional[Any] = None

def get_supabase_client() -> Optional[Any]:
    """Returns an authenticated Supabase client using service role key, or None if unconfigured."""
    global _supabase_client
    if _supabase_client is None:
        if settings.SUPABASE_URL and settings.SUPABASE_SERVICE_ROLE_KEY:
            try:
                # Ensure site-packages is searched before current directory's 'supabase' folder
                cwd = os.path.abspath(os.getcwd())
                clean_path = [p for p in sys.path if os.path.abspath(p) != cwd and p != '']
                sys.path, old_path = clean_path, sys.path
                try:
                    from supabase import create_client
                finally:
                    sys.path = old_path
                    
                _supabase_client = create_client(
                    settings.SUPABASE_URL,
                    settings.SUPABASE_SERVICE_ROLE_KEY
                )
            except Exception as e:
                print(f"[Supabase Init Warning] {e}")
                _supabase_client = None
    return _supabase_client
