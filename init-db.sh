#!/bin/sh

export POSTGRES_USER=$(cat /run/secrets/pg_user)
export POSTGRES_PASSWORD=$(cat /run/secrets/pg_password)
export POSTGRES_DB=$(cat /run/secrets/pg_db)

exec docker-entrypoint.sh postgres