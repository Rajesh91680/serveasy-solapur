from django.contrib import admin
from django.urls import path, include
from api_core.views import home   # simple homepage so / doesn't 404

urlpatterns = [
    path("",       home),                        # GET / → "API is running"
    path("admin/", admin.site.urls),
    path("api/",   include("api_core.urls")),    # all API routes under /api/
]