# FROM python:3.10
# FROM python:3.10.0a1-alpine3.12
# FROM python:3.9.5-slim
FROM python:3.8.3-slim 
#Image python:3.9.5-slim also works # Image python:3.9.5-slim-buster also works

# ENV UKS 1

RUN mkdir /code
WORKDIR /code
ADD . /code


RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

RUN pip install --upgrade pip
# RUN pip uninstall psycopg2 psycopg2-binary
RUN pip install --upgrade wheel
RUN pip install --upgrade setuptools
RUN pip install -r requirements.txt

RUN python manage.py collectstatic --noinput

# EXPOSE 8000

# CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "ukshub.wsgi:application"]

CMD gunicorn ukshub.wsgi:application --bind 0.0.0.0:$PORT

# RUN ["chmod", "+x", "waitforpostgres.sh"]
# RUN ["chmod", "+x", "start.sh"]

# Python and Linux Version 
# FROM python:3.10.0a1-alpine3.12

# COPY requirements.txt /app/requirements.txt

# # Configure server
# RUN set -ex \
#     && pip install --upgrade pip \  
#     && pip uninstall psycopg2 \ 
#     && pip install --upgrade wheel \ 
#     && pip install --upgrade setuptools \
#     && pip install --no-cache-dir -r /app/requirements.txt 

# # Working directory
# WORKDIR /app

# ADD . .

# EXPOSE 8000

# CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "ukshub.wsgi:application"]

# CMD gunicorn core.wsgi:application --bind 0.0.0.0:$PORT