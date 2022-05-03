"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .project import test_projects, test_index, test_documentation, test_issue, populate
from .project import index, new_project, project, issue, get_documentation, get_description, get_analysis, get_evaluation, update_description, update_analysis, update_evaluation
from .doorman.doorman import get_all_projects


urlpatterns = [
    path('admin/', admin.site.urls),

    path('testindex/', test_index),
    path('testprojects/<str:project_id>', test_projects),
    path('testdocu/<str:project_id>', test_documentation),
    path('testissue/<str:project_id>/<str:issue_id>', test_issue),
    path('populate/', populate),

    path('index/', index),
    path('new-project/', new_project),

    path('project/<str:project_id>/', project),
    path('project/<str:project_id>/get-doc/', get_documentation),
    path('project/<str:project_id>/get-desc/', get_description),
    path('project/<str:project_id>/get-ana/', get_analysis),
    path('project/<str:project_id>/get-eval/', get_evaluation),

    path('issue/<str:project_id>/<str:issue_id>/', issue)
]
