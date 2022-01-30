find . -path "*/authentication/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/progresstrackapp/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/useractivityapp/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/versioningapp/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/authentication/migrations/*.pyc" -delete
find . -path "*/progresstrackapp/migrations/*.pyc" -delete
find . -path "*/useractivityapp/migrations/*.pyc" -delete
find . -path "*/versioningapp/migrations/*.pyc" -delete

python manage.py makemigrations
python manage.py migrate
python manage.py loaddata versioningapp_init_data.json