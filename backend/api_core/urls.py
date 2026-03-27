from django.urls import path
from . import views


urlpatterns = [

    # =========================
    # 🔹 AUTH APIs
    # =========================
    path('auth/register', views.register),
    path('auth/login', views.login),

    # =========================
    # 🔹 USER APIs
    # =========================
    path('users/<int:id>', views.get_user),
    path('users/<int:id>/update', views.update_user),

    # =========================
    # 🔹 SERVICES APIs
    # =========================
    path('services', views.get_services),              # GET all
    path('services/create', views.create_service),     # POST
    path('services/<int:id>/update', views.update_service),  # PUT
    path('services/<int:id>/delete', views.delete_service),  # DELETE

    # =========================
    # 🔹 PROVIDERS APIs
    # =========================
    path('providers', views.get_providers),                 # GET all
    path('providers/create', views.create_provider),        # POST
    path('providers/<int:id>', views.get_provider_by_id),   # ✅ GET single (FIXED)
    path('providers/<int:id>/update', views.update_provider), # PUT
    path('providers/<int:id>/delete', views.delete_provider), # DELETE
]