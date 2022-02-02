#!/bin/bash

python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata versioningapp_init_data.json
python manage.py runserver 0.0.0.0:8000