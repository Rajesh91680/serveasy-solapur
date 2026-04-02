from django.urls import path
from . import views 

urlpatterns = [

    # -------------------------
    # Authentication & User
    # -------------------------
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login, name='login'),
    path('verify-otp/', views.verify_otp),
    path('resend-otp/', views.resend_otp),

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
    # Addresses (UPDATED)
    # -------------------------
    path('addresses/', views.get_all_addresses, name='get_all_addresses'),   # GET
    path('addresses/create/', views.create_address, name='create_address'),  # POST

    path('addresses/user/<int:user_id>/', views.get_user_addresses, name='user_addresses'),
    path('addresses/<int:pk>/', views.address_detail, name='address_detail'),  # GET, PUT, DELETE


    # -------------------------
    # Provider Status (NEW)
    # -------------------------
    path('provider-status/<int:provider_id>/wa-sent/', views.save_wa_sent, name='save_wa_sent'),
    path('provider-status/<int:provider_id>/response/', views.save_provider_response, name='save_provider_response'),
    path('provider-status/<int:provider_id>/confirm/', views.confirm_provider, name='confirm_provider'),
    path('provider-status/', views.get_provider_status, name='get_provider_status'),


    # -------------------------
    # Bookings
    # -------------------------
    path('bookings/create/', views.create_booking, name='create_booking'),
    path('respond/', views.respond_via_link, name='respond_via_link'),



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

]