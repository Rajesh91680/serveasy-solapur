from django.urls import path
from api_core import views
urlpatterns = [
    path('users/',            views.admin_users),
    path('providers/',        views.admin_providers),
    path('service-requests/', views.admin_requests),
    path('reviews/',          views.admin_reviews),
    path('stats/',            views.admin_stats),
    path('services/',         views.admin_create_service),
    path('services/<int:pk>/', views.admin_service_detail),
    path('providers/add/',    views.admin_create_provider),
    path('providers/<int:pk>/', views.admin_provider_detail),
]
