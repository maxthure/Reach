import json
import os

from django.http import HttpResponse


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