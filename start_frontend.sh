#!/bin/bash

# Start React.js processes
echo Starting Frontend.

cd crida_webapp

exec npm install http-server -g

exec http-server -a 0.0.0.0 -p 55001
