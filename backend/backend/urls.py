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
from .project import index, project, get_description, update_description, get_analysis, update_analysis, get_evaluation, update_evaluation, get_documentation, update_documentation, new_project
from .issue import issue
from .measurement import get_measurement, update_measurement, get_screenshot
from .user import get_users
from .testing import test_projects, test_index, test_documentation, test_issue

urlpatterns = [
    path('admin/', admin.site.urls),

    path('index/', index),
    path('project/<str:project_id>/', project),
    path('project/<str:project_id>/get-desc/', get_description),
    path('project/<str:project_id>/update-desc/', update_description),
    path('project/<str:project_id>/get-ana/', get_analysis),
    path('project/<str:project_id>/update-ana/', update_analysis),
    path('project/<str:project_id>/get-eval/', get_evaluation),
    path('project/<str:project_id>/update-eval/', update_evaluation),
    path('project/<str:project_id>/get-doc/', get_documentation),
    path('project/<str:project_id>/update-doc', update_documentation),
    path('new-project/', new_project),

    path('issue/<str:project_id>/<str:issue_id>/', issue),

    path('measurement/<str:measurement_id>/get-meas/', get_measurement),
    path('measurement/<str:measurement_id>/update-meas/', update_measurement),
    path('measurement/<str:measurement_id>/screenshot/', get_screenshot),

    path('user/get-users/', get_users),

    path('testindex/', test_index),
    path('testprojects/<str:project_id>/', test_projects),
    path('testdocu/<str:project_id>/', test_documentation),
    path('testissue/<str:project_id>/<str:issue_id>/', test_issue),
]
