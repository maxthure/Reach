import json
from django.http import HttpResponse


# for testing and development only
def test_projects(param):
    f = open('./data/Projects.json')
    data = json.load(f)
    with open('./data/projects/project1/texts/description.txt', 'r') as desc:
        data["description"] = desc.read()
    with open('./data/projects/project1/texts/info.txt', 'r') as desc:
        data["info"] = desc.read()
    res = json.dumps(data)
    return HttpResponse(res)


