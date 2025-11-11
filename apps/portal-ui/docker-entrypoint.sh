#!/bin/sh
set -e

echo "traffic prefixed with '/api' will be forwarded to: ${API_URL}"
echo "site id is: ${API_SITE_ID}"

envsubst '${API_URL} ${API_SITE_ID}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

echo "starting interpolated nginx..."

# Execute the CMD passed to the container
exec "$@"
