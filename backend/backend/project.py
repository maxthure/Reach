import json

from django.core.exceptions import ValidationError
from django.http import HttpResponse, QueryDict
from django.contrib.auth.models import User
from projects.models import Project, Measurement, Issue, ProjectUser
from glob import glob


# returns all projects to generate a project overview
def index(request):
    all_projects = Project.objects.all()
    projects = []

    for project in all_projects:
        dictionary = {"id": str(project.id), "name": project.name, "description": project.description,
                      "created_at": str(project.created_at), "info": project.info,
                      "documentation": project.documentation, "analysis": project.analysis,
                      "evaluation": project.evaluation}
        projects.append(dictionary)

    # TODO hier fehlt noch die Unterteilung in Recent und All Projects abgestimmt auf den User

    f = json.dumps(projects)
    return HttpResponse(f)


# returns a specific project for the detailed project view
def project(request, project_id):
    proj = Project.objects.get(id=project_id)
    measurements = Measurement.objects.filter(projectmeasurement__project_id_id=project_id)
    issues = Issue.objects.filter(projectissue__project_id_id=project_id)
    proj_users = ProjectUser.objects.filter(project_id_id=project_id)

    meas = []
    for m in measurements:
        dic = {"id": str(m.id), "screenshot_path": m.screenshot_path, "setup_path": m.setup_path,
               "raw_data_path": m.raw_data_path, "temperature": m.temperature, "date_time": str(m.date_time),
               "analysis": m.analysis, "description": m.description, "evaluation": m.evaluation}
        meas.append(dic)

    iss = []
    for i in issues:
        dic = {"id": str(i.id), "name": i.name, "description": i.description, "created_at": str(i.created_at)}
        iss.append(dic)

    owners = []
    collaborators = []
    viewers = []
    for u in proj_users:
        user = User.objects.get(id=u.user_id_id)
        if u.access_level == 2:
            owners.append(user.first_name+" "+user.last_name)
        elif u.access_level == 1:
            collaborators.append(user.first_name+" "+user.last_name)
        elif u.access_level == 0:
            viewers.append(user.first_name+" "+user.last_name)

    dictionary = {"id": str(proj.id), "name": proj.name, "description": proj.description,
                  "created_at": str(proj.created_at), "info": proj.info,
                  "documentation": proj.documentation, "analysis": proj.analysis,
                  "evaluation": proj.evaluation, "measurements": meas, "issues":iss, "owners": owners,
                  "collaborators": collaborators, "viewers": viewers}

    f = json.dumps(dictionary)
    return HttpResponse(f)


def get_description(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        return HttpResponse(p.description)
    except ValidationError:
        return HttpResponse("")


def update_description(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        p.description = request.read().decode('utf-8')
        p.save()
    except ValidationError:
        return HttpResponse("Failed")

    return HttpResponse("Success")


def get_analysis(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        return HttpResponse(p.analysis)
    except ValidationError:
        return HttpResponse("")


def update_analysis(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        p.analysis = request.read().decode('utf-8')
        p.save()
    except ValidationError:
        return HttpResponse("Failed")

    return HttpResponse("Success")


def get_evaluation(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        return HttpResponse(p.evaluation)
    except ValidationError:
        return HttpResponse("")


def update_evaluation(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        p.evaluation = request.read().decode('utf-8')
        p.save()
    except ValidationError:
        return HttpResponse("Failed")

    return HttpResponse("Success")


# returns all the info necessary to generate the documentation view for a project
def get_documentation(request, project_id):
    measurements = Measurement.objects.filter(projectmeasurement__project_id_id=project_id)

    meas = []
    for m in measurements:
        screenshots = []
        for sc in glob('.'+m.screenshot_path+'/*'):
            screenshots.append(sc)

        dic = {"id": str(m.id), "screenshot_path": m.screenshot_path, "setup_path": m.setup_path,
               "raw_data_path": m.raw_data_path, "temperature": m.temperature, "date_time": str(m.date_time),
               "analysis": m.analysis, "description": m.description, "evaluation": m.evaluation,
               "screenshots": screenshots}
        meas.append(dic)

    try:
        p = Project.objects.get(id=project_id)
        response = {
            "description": p.description,
            "analysis": p.analysis,
            "evaluation": p.evaluation,
            "measurements": dic
        }
        return HttpResponse(json.dumps(response))
    except ValidationError:
        return HttpResponse("")


# Updates:
#  - Description
#  - Analysis
#  - Evaluation
def update_documentation(request, project_id):
    req_data = request.read().decode('utf-8')
    data = json.loads(req_data)

    try:
        p = Project.objects.get(id=project_id)
        p.description = data["description"]
        p.analysis = data["analysis"]
        p.evaluation = data["evaluation"]
        p.save()
    except ValidationError:
        return HttpResponse("Failed")

    return HttpResponse("Success")


def new_project(request):
    project_data = QueryDict(request.readline().decode('utf-8'))
    new_proj = Project()
    new_proj.name = project_data['project-name']
    new_proj.info = project_data['project-info']
    new_proj.save()
    return HttpResponse("<html><head><meta http-equiv='refresh' content='1; url=http://localhost:3000' /></head><body>Success <br /><br />2 Second until redirected ...</body></html>")


