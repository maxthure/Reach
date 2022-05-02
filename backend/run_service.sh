#/bin/bash

python3 manage.py makemigrations projects
python3 manage.py migrate
python3 maange.py runserver 0.0.0.0:8000
