import json

from django.http import HttpResponse
from django.contrib.auth.models import User


def get_users(request):
    all_users = User.objects.all()
    users = []

    for user in all_users:
        dictionary = {"id": str(user.id), "last_login": user.last_login, "username": user.username,
                      "email": user.email, "last_name": user.last_name, "first_name": user.first_name}
        users.append(dictionary)

    f = json.dumps(users)
    return HttpResponse(f)