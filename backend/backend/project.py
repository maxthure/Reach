import json
import os

from django.core.exceptions import ValidationError
from django.http import HttpResponse, QueryDict
from projects.models import Project, Measurement, Issue, ProjectIssue

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
        i = ProjectIssue()
        i.issue_id_id = 'b6a932fa34a5443d9e4a438255186b27'
        i.project_id_id = 'f92298adfd27492eabc091a69b9a4627'
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
                      "documentation": project.documentation}
        projects.append(dictionary)

    #TODO hier fehlt noch die Unterteilung in Recent und All Projects abgestimmt auf den User

    f = json.dumps(projects)
    return HttpResponse(f)


def project(request, project_id):
    proj = Project.objects.get(id=project_id)
    measurements = Measurement.objects.filter(projectmeasurement__project_id_id=project_id)
    issues = Issue.objects.filter(projectissue__project_id_id=project_id)

    meas = []
    for m in measurements:
        dic = {"id": str(m.id), "screenshot_path": m.screenshot_path, "setup_path": m.setup_path,
               "raw_data_path": m.raw_data_path, "temperature": m.temperature, "date_time": str(m.date_time)}
        meas.append(dic)

    iss = []
    for i in issues:
        dic = {"id": str(i.id), "name": i.name, "description": i.description, "created_at": str(i.created_at)}
        iss.append(dic)

    dictionary = {"id": str(proj.id), "name": proj.name, "description": proj.description,
                  "created_at": str(proj.created_at), "info": proj.info,
                  "documentation": proj.documentation, "measurements": meas, "issues":iss}

    #TODO hier fehlen noch die User und deren Rolle

    f = json.dumps(dictionary)
    return HttpResponse(f)


def documentation(request, project_id):

    #TODO case handeln, dass es noch keine Doku gibt bzw. eigentlich sollte die Doku immer on-demand erstellt werden, damit sie immer aktuell ist

    proj = Project.objects.get(id=project_id)
    with open(os.getcwd() + proj.documentation, 'rb') as pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'inline;filename=documentation.pdf'
        return response


def issue(request, project_id, issue_id):
    i = Issue.objects.filter(projectissue__project_id_id=project_id).get(id=issue_id)
    dic = {"id": str(i.id), "name": i.name, "description": i.description, "created_at": str(i.created_at)}
    f = json.dumps(dic)
    return HttpResponse(f)


def get_documentation_text(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        return HttpResponse(p.documentation)
    except ValidationError:
        return HttpResponse("")


def update_documentation(request, project_id):
    try:
        p = Project.objects.get(id=project_id)
        p.documentation = request.read().decode('utf-8')
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