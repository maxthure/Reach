import json

from django.http import HttpResponse
from django.contrib.auth.models import User
from projects.models import Issue, ProjectUser, IssueUser


# returns a specific issue for the detailed project view
def issue(request, project_id, issue_id):
    proj_users = ProjectUser.objects.filter(project_id_id=project_id)

    users = []
    for u in proj_users:
        user = User.objects.get(id=u.user_id_id)
        if u.access_level == 2 or u.access_level == 1:
            users.append({"id": user.id, "first_name": user.first_name, "last_name": user.last_name})

    i = Issue.objects.filter(projectissue__project_id_id=project_id).get(id=issue_id)
    dic = {"id": str(i.id), "name": i.name, "description": i.description, "created_at": str(i.created_at),
           "possible_assignees": users}
    f = json.dumps(dic)
    return HttpResponse(f)


def assign_users(request, issue_id):
    req_data = request.read().decode('utf-8')
    data = json.loads(req_data)

    for user in data:
        iu = IssueUser()
        iu.issue_id_id = issue_id
        iu.user_id_id = user
        iu.save()

    # TODO keine Ahnung, was man hier zurückgeben soll

    return HttpResponse("Success")
