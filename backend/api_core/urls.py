from django.urls import path
from . import views

urlpatterns = [

    # -------------------------
    # Authentication & User
    # -------------------------
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login, name='login'),

    path('users/<int:id>/', views.get_user, name='get_user'),
    path('users/<int:id>/update/', views.update_user, name='update_user'),


    # -------------------------
    # Services
    # -------------------------
    path('services/', views.get_services, name='get_services'),
    path('services/<int:pk>/', views.get_service_detail, name='service_detail'),


    # -------------------------
    # Providers
    # -------------------------
    path('providers/', views.get_providers, name='get_providers'),
    path('providers/service/<int:service_id>/', views.get_providers_by_service, name='providers_by_service'),
    path('providers/<int:pk>/', views.get_provider_detail, name='provider_detail'),


    # -------------------------
    # Addresses (UPDATED ✅)
    # -------------------------
    path('addresses/', views.get_all_addresses, name='get_all_addresses'),   # GET
    path('addresses/create/', views.create_address, name='create_address'),  # POST

    path('addresses/user/<int:user_id>/', views.get_user_addresses, name='user_addresses'),  # ✅ FIXED
    path('addresses/<int:pk>/', views.address_detail, name='address_detail'),  # GET, PUT, DELETE
]