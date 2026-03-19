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

]