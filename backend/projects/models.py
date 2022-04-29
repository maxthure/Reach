from django.db import models
from django.conf import settings
import uuid


class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    time = models.DateField(auto_now_add=True)
    documentation = models.CharField(max_length=5000, null=True)

    def __str__(self):
        return self.name


class Issue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Measurement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    screenshot_path = models.CharField(max_length=300)
    setup_path = models.CharField(max_length=300)
    raw_data_path = models.CharField(max_length=300)
    time = models.DateField(auto_now_add=True)
    temperature = models.IntegerField()

    def __str__(self):
        return self.screenshot_path + " (" + str(self.time) + ")"


class ProjectMeasurement(models.Model):
    project_id = models.ForeignKey('Project', on_delete=models.PROTECT)
    measurement_id = models.ForeignKey('Measurement', on_delete=models.PROTECT)


class ProjectIssue(models.Model):
    issue_id = models.ForeignKey('Issue', on_delete=models.PROTECT)
    project_id = models.ForeignKey('Project', on_delete=models.PROTECT)


class ProjectUser(models.Model):
    project_id = models.ForeignKey('Project', on_delete=models.PROTECT)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)


class IssueUser(models.Model):
    issue_id = models.ForeignKey('Issue', on_delete=models.PROTECT)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)