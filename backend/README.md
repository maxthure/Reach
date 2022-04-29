# Backend

## Django Models
Models define a database schema. They are defined in `projects/models.py`. 
The database schema is defined in the following diagram:
![Database Schema](./database_schema.png)

### Migrate Models
```
# Create migration file (only needed, if migration files are not already present).
python3 manage.py makemigrations projects

# Create DB Schema according to given Models.
python3 manage.py migrate
```

### Using Models
Once the schema is defined, it can be used in an object-oriented way 
(also see [Django ORM](https://tutorial.djangogirls.org/de/django_orm/):

Creating objects and writing to database:
```python
from projects.models import Project

p = Project() # Create new Project object

# Set values
p.name = "LTE-Standard"
p.description = "A measurement of the LTE-Standard"

# Save to database
p.save()
```

Pulling from database:
```python
from projects.models import Project

all_objects = Project.objects.all() # Returns a list with all instances of Project
all_objects[0].name # Returns the name of the first element in List

lte_objects = Project.objects.filter(name = "LTE") # All projects with the name 'LTE'
```