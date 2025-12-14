#!/bin/bash
PORT=${PORT:-8000}  # Use $PORT from environment, default to 8000 if not set
PORT=${PORT//[^0-9]/}  # Ensure PORT is only numeric characters (remove any non-numeric characters)
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT --reload