import json
from django.http import HttpResponse


# for testing and development only
def test_index(request):
    f = open('./data/Index.json')
    return HttpResponse(f)


def test_projects(request, project_id):
    f = open('./data/Index.json')
    data = json.load(f)
    with open('./data/projects/project'+project_id+'/texts/description.txt', 'r') as desc:
        data["description"] = desc.read()
    with open('./data/projects/project'+project_id+'/texts/info.txt', 'r') as desc:
        data["info"] = desc.read()
    res = json.dumps(data)
    return HttpResponse(res)

