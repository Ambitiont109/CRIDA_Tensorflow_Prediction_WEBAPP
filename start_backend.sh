#!/bin/bash

# Start Gunicorn processes
echo Starting Gunicorn.

cd crida_backend

exec gunicorn crida_backend.wsgi:application \
    --bind 0.0.0.0:55002 \
    --workers 3
