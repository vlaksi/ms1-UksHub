## Starting project:

1. cd to /ukshub
2. run command "python manage.py runserver"

## Create app in project:

1. python manage.py startapp <name>

## Migrations:

1. cd to /ukshub
2. python manage.py makemigrations
3. python manage.py migrate

## Testings:

1. cd to /ukshub
2. python manage.py test 'app name' (eg. python manage.py test progresstrackapp)

## Load inital data:

1. cd to /ukshub
2. python manage.py loaddata versioningapp_init_data.json

## Reset migrations:

1. cd to /ukshub
2. delete db & create new one with name 'uks'
3. just run in /ukshub this cmd: ./resetmigrations.sh

## About init data:

You can log in with
username: dragana
pass: Ovejejakasifra!
