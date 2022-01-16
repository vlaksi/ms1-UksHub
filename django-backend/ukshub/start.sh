#!/bin/bash

python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate
# python manage.py runserver 0.0.0.0:8000
# gunicorn ukshub.wsgi:application -b 0.0.0.0:$PORT
gunicorn ukshub.wsgi:application --bind 0.0.0.0:$PORT