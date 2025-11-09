#!/bin/sh
set -e

echo "traffic prefixed with '/api' will be forwarded to: ${API_URL}"

envsubst '${API_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

echo "starting interpolated nginx..."

# Execute the CMD passed to the container
exec "$@"
