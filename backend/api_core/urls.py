# Admin Dashboard .js page 

from django.urls import path
from .views import admin_dashboard_stats

urlpatterns = [
    path('admin/dashboard-stats/', admin_dashboard_stats),
]