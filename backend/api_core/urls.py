from django.urls import path
from . import views

urlpatterns = [
    path('service-requests/', views.create_service_request),
    path('service-requests/user/<int:user_id>/', views.get_requests_by_user),
    path('service-requests/provider/<int:provider_id>/', views.get_requests_by_provider),
    path('service-requests/<int:pk>/', views.service_request_detail),
    path('reviews/', views.create_review),
    path('reviews/provider/<int:provider_id>/', views.get_reviews_by_provider),
    path('reviews/<int:pk>/', views.get_review_detail),
]
