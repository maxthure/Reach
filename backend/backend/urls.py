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
from .project import test_projects, test_index, test_documentation, test_issue
from .project import index
import backend
from .doorman.doorman import get_all_projects


urlpatterns = [
    path('admin/', admin.site.urls),

    path('testindex', test_index),
    path('testprojects/<str:project_id>', test_projects),
    path('testdocu/<str:project_id>', test_documentation),
    path('testissue/<str:project_id>/<str:issue_id>', test_issue),
    path('index/', index),
    path('all-projects', get_all_projects)
]
