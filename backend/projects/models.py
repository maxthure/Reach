from datetime import datetime

from django.db import models
from django.conf import settings
import uuid


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    # Short info about the project
    info = models.CharField(max_length=500, default="")
    # Exhaustive description of the project
    description = models.CharField(max_length=5000, default="")
    # Analysis of the measurements
    analysis = models.CharField(max_length=5000, default="")
    # Evaluation of the project
    evaluation = models.CharField(max_length=5000, default="")
    # Path to documentation file
    documentation = models.CharField(max_length=5000, default="")

    def __str__(self):
        return self.name


class Issue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    # Description of the issue
    description = models.CharField(max_length=5000)

    def __str__(self):
        return self.name


class Measurement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    # path to screenshot file
    screenshot_path = models.CharField(max_length=300)
    # path to screenshot file
    setup_path = models.CharField(max_length=300)
    # path to screenshot file
    raw_data_path = models.CharField(max_length=300)
    date_time = models.DateTimeField(default=datetime.now, blank=True)
    temperature = models.IntegerField()

    def __str__(self):
        return self.screenshot_path + " (" + str(self.date_time) + ")"


class ProjectMeasurement(models.Model):
    project_id = models.ForeignKey('Project', on_delete=models.PROTECT)
    measurement_id = models.ForeignKey('Measurement', on_delete=models.PROTECT)


class ProjectIssue(models.Model):
    issue_id = models.ForeignKey('Issue', on_delete=models.PROTECT)
    project_id = models.ForeignKey('Project', on_delete=models.PROTECT)


class ProjectUser(models.Model):
    project_id = models.ForeignKey('Project', on_delete=models.PROTECT)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    access_level = models.IntegerField(default=0)
    last_access = models.DateTimeField(default=datetime.now, blank=True)


class IssueUser(models.Model):
    issue_id = models.ForeignKey('Issue', on_delete=models.PROTECT)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)