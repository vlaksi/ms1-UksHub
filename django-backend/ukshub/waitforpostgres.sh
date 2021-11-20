#!/bin/bash

function postgres_ready() {
    python << END
import sys
import psycopg2
try:
    conn = psycopg2.connect(dbname="postgres", user="postgres", password="postgres", host="db")
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
    >&2 echo "Postgres db currently is unavailable - sleeping"
    sleep 1
done

>&2 echo "Postgres is up - executing command"

./start.sh