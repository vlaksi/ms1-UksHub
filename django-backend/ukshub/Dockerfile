FROM python:3.8.3-slim 

RUN mkdir /code
WORKDIR /code
ADD . /code


RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

# RUN cd django-backend/ukshub
RUN pip install --upgrade pip
# # RUN pip uninstall psycopg2 psycopg2-binary
RUN pip install --upgrade wheel
RUN pip install --upgrade setuptools
RUN ls
RUN pip install -r requirements.txt

# RUN python manage.py collectstatic --noinput
# # RUN python manage.py makemigrations
# RUN python manage.py migrate

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "ukshub.wsgi:application"]

# CMD gunicorn ukshub.wsgi:application --bind 0.0.0.0:$PORT
