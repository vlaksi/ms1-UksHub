FROM python:3.10
ENV UKS 1

RUN mkdir /code
WORKDIR /code
ADD . /code

RUN pip install --upgrade pip
RUN pip uninstall psycopg2
RUN pip install --upgrade wheel
RUN pip install --upgrade setuptools
RUN pip install -r requirements.txt

RUN ["chmod", "+x", "waitforpostgres.sh"]
RUN ["chmod", "+x", "start.sh"]