# urls.py
# This file defines the API routes for the api_core app.
# It maps each URL to its corresponding view function.
# Member 1 - Authentication & Profile

from django.urls import path
from . import views

urlpatterns = [

    # POST /api/auth/register  →  Signup - creates a new user
    path('auth/register', views.register, name='register'),

    # POST /api/auth/login  →  Login - verifies user credentials
    path('auth/login', views.login, name='login'),

    # GET /api/users/<id>  →  Get user profile by ID
    path('users/<int:id>', views.get_user, name='get_user'),

    # PUT /api/users/<id>/update  →  Update user profile
    path('users/<int:id>/update', views.update_user, name='update_user'),

    # Admin & Service Management
    path('services', views.create_service),
    path('services/<int:id>', views.update_service),
    path('services/delete/<int:id>', views.delete_service),
    path('services/all', views.get_services),

    # Admin & Provider Management
    path('providers', views.create_provider),
    path('providers/<int:id>', views.update_provider),
    path('providers/delete/<int:id>', views.delete_provider),
    path('providers/all', views.get_providers),

    # =========================================================
    # 🔹 REVIEWS ROUTES (User Side)
    # =========================================================

    # POST /api/reviews/submit  →  Save rating and work photo to DB
    path('reviews/submit', views.submit_review, name='submit_review'),

    # GET /api/admin/reviews/all  →  Fetch all reviews for Admin
    path('admin/reviews/all', views.get_all_reviews, name='get_all_reviews'),
    

    # GET /api/admin/stats  →  Fetch counts for Dashboard
    path('admin/stats', views.admin_dashboard_stats, name='admin_stats'),

    # Admin - Service Request Management
    path('admin/service-requests', views.get_service_requests, name='get_all_requests'),
    path('admin/service-requests/<int:id>/update-status', views.update_service_status, name='update_status'),

    path('admin/users', views.get_admin_users, name='admin_users'),

    path('admin/providers', views.get_admin_providers, name='admin_providers'),

    # Provider Management
    path('providers/all', views.get_admin_providers, name='all_providers'),
    path('providers/<int:id>', views.update_provider_details, name='update_provider'),

    path('admin/reviews', views.get_admin_reviews, name='admin_reviews'),
    path('admin/reviews/<int:id>/status', views.update_review_status, name='review_status'),

]