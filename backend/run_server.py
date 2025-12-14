import os
import uvicorn
from app.main import app

if __name__ == "__main__":
    port_str = os.environ.get("PORT", "8000")
    # Strip any non-numeric characters to ensure it's a valid port
    port = int(''.join(filter(str.isdigit, port_str)) or 8000)
    uvicorn.run(app, host="0.0.0.0", port=port)