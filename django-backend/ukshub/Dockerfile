FROM python:3.8.3-slim 

RUN mkdir /code
WORKDIR /code
ADD . /code


RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

RUN pip install --upgrade pip
RUN pip install --upgrade wheel
RUN pip install --upgrade setuptools
RUN ls
RUN pip install -r requirements.txt
RUN apt-get -y install git

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "ukshub.wsgi:application"]

RUN ["chmod", "+x", "waitforpostgres.sh"]
RUN ["chmod", "+x", "start.sh"]