import json
import os

from django.core.exceptions import ValidationError
from django.http import HttpResponse, QueryDict
from django.contrib.auth.models import User
from projects.models import Project, Measurement, Issue, ProjectIssue, ProjectUser

database = './db.sqlite3'


# for testing and development only
def test_index(request):
    f = open(os.getcwd() + '/data/Index.json')
    return HttpResponse(f)


def test_projects(request, project_id):
    f = open(os.getcwd() + '/data/projects/' + project_id + '/Project.json')
    data = json.load(f)
    with open(os.getcwd() + '/data/projects/'+project_id+'/texts/description.txt', 'r') as desc:
        data["description"] = desc.read()
    res = json.dumps(data)
    return HttpResponse(res)


def test_documentation(request, project_id):
    with open(os.getcwd() + '/data/projects/' + project_id + '/CPMS.pdf', 'rb') as pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'inline;filename=documentation.pdf'
        return response


def test_issue(request, project_id, issue_id):
    f = open(os.getcwd() + '/data/projects/' + project_id + '/issues/Issue' + issue_id + '.json')
    return HttpResponse(f)


def populate(request):
    try:
        i = ProjectUser()
        i.user_id_id = '6'
        i.project_id_id = 'db43838eb2e645babdce85a5a727eeb9'
        i.access_level = '0'
        i.save()
        HttpResponse("Success")
    except Exception:
        HttpResponse("Failed")


# with database queries
def index(request):
    all_projects = Project.objects.all()
    projects = []

    for project in all_projects:
        dictionary = {"id": str(project.id), "name": project.name, "description": project.description,
                      "created_at": str(project.created_at), "info": project.info,
                      "documentation": project.documentation, "analysis": project.analysis,
                      "evaluation": project.evaluation}
        projects.append(dictionary)

    #TODO hier fehlt noch die Unterteilung in Recent und All Projects abgestimmt auf den User

    f = json.dumps(projects)
    return HttpResponse(f)


def project(request, project_id):
    proj = Project.objects.get(id=project_id)
    measurements = Measurement.objects.filter(projectmeasurement__project_id_id=project_id)
    issues = Issue.objects.filter(projectissue__project_id_id=project_id)
    users = User.objects.filter(projectuser__project_id_id=project_id)

    meas = []
    for m in measurements:
        dic = {"id": str(m.id), "screenshot_path": m.screenshot_path, "setup_path": m.setup_path,
               "raw_data_path": m.raw_data_path, "temperature": m.temperature, "date_time": str(m.date_time)}
        meas.append(dic)

    iss = []
    for i in issues:
        dic = {"id": str(i.id), "name": i.name, "description": i.description, "created_at": str(i.created_at)}
        iss.append(dic)

    owners = []
    collaborators = []
    viewers = []
#    for u in users:
#        if u.access_level == '2':
#            owners.append(u.first_name+" "+u.last_name)
#        elif u.access_level == '1':
#            collaborators.append(u.first_name+" "+u.last_name)
#        elif u.access_level == '0':
#            viewers.append(u.first_name+" "+u.last_name)

    dictionary = {"id": str(proj.id), "name": proj.name, "description": proj.description,
                  "created_at": str(proj.created_at), "info": proj.info,
                  "documentation": proj.documentation, "analysis": proj.analysis,
                  "evaluation": proj.evaluation, "measurements": meas, "issues":iss, "owners": owners,
                  "collaborators": collaborators, "viewers": viewers}

    #TODO hier fehlen noch die User und deren Rolle

    f = json.dumps(dictionary)
    return HttpResponse(f)


def issue(request, project_id, issue_id):
    i = Issue.objects.filter(projectissue__project_id_id=project_id).get(id=issue_id)
    dic = {"id": str(i.id), "name": i.name, "description": i.description, "created_at": str(i.created_at)}
    f = json.dumps(dic)
    return HttpResponse(f)


def get_documentation(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        description = p.description
        analysis = p.analysis
        evaluation = p.evaluation
        return HttpResponse(description+"<br /><br />"+analysis+"<br /><br />"+evaluation)
    except ValidationError:
        return HttpResponse("")


def get_description(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        return HttpResponse(p.description)
    except ValidationError:
        return HttpResponse("")


def get_analysis(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        return HttpResponse(p.analysis)
    except ValidationError:
        return HttpResponse("")


def get_evaluation(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        return HttpResponse(p.evaluation)
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


def update_analysis(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        p.analysis = request.read().decode('utf-8')
        p.save()
    except ValidationError:
        return HttpResponse("Failed")

    return HttpResponse("Success")


def update_evaluation(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        p.evaluation = request.read().decode('utf-8')
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