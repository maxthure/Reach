import os

from django.http import HttpResponse

from backend.datasource.project import Project


class Doorman:
    def __init__(self):
        self.data_path = "/data/projects/"
        self.all_projects = []

    def get_all_projects(self):
        projects = os.listdir(os.getcwd() + self.data_path)
        project_list = []
        for project in projects:
            p = Project(os.getcwd() + self.data_path + project)
            p.set_name(project)
            project_list.append(p)

        self.all_projects = project_list
        return project_list

    def get_all_project_names(self):
        res = []
        for p in self.all_projects:
            res.append(p.get_name())
        return res

    def get_project(self, project_name):
        for p in self.all_projects:
            if p.get_name() == project_name:
                return p
        return None

    def add_project(self, project):
        self.all_projects.append(project)


# Testing
def get_all_projects(arg):
    d = Doorman()
    projects = d.get_all_projects()

    res = ""
    for p in projects:
        res += p.get_description()

    return HttpResponse(res)
