#/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
PYTHON_RUNFILE="$SCRIPTPATH/manage.py"

python3 "$PYTHON_RUNFILE" makemigrations projects
python3 "$PYTHON_RUNFILE" migrate
python3 "$PYTHON_RUNFILE" runserver 0.0.0.0:8000
