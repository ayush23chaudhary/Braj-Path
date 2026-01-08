#!/bin/bash
cd "$(dirname "$0")"
exec ./node_modules/.bin/next dev -p 3001
