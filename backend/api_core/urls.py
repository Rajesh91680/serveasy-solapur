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
    path('users/<int:user_id>/bookings/', views.get_user_bookings, name='user_bookings'),
    path('users/<int:user_id>/reviews/', views.get_user_reviews, name='user_reviews'),


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
    path('providers/<int:provider_id>/reviews/', views.get_provider_reviews, name='provider_reviews'),


    # -------------------------
    # Addresses
    # -------------------------
    path('addresses/', views.get_all_addresses, name='get_all_addresses'),
    path('addresses/create/', views.create_address, name='create_address'),
    path('addresses/user/<int:user_id>/', views.get_user_addresses, name='user_addresses'),
    path('addresses/<int:pk>/', views.address_detail, name='address_detail'),


    # -------------------------
    # Provider Status & Workflow
    # -------------------------
    path('provider-status/<int:provider_id>/wa-sent/', views.save_wa_sent, name='save_wa_sent'),
    path('provider-status/<int:provider_id>/response/', views.save_provider_response, name='save_provider_response'),
    path('provider-status/<int:provider_id>/confirm/', views.confirm_provider, name='confirm_provider'),
    path('provider-status/', views.get_provider_status, name='get_provider_status'),
    path('respond/', views.respond_via_link, name='respond_via_link'),


    # -------------------------
    # Bookings & Service Requests
    # -------------------------
    path('bookings/create/', views.create_booking, name='create_booking'),
    
    # Review Submission
    path('reviews/submit', views.submit_review, name='submit_review'),


    # -------------------------
    # Admin Dashboard & Stats (New)
    # -------------------------
    path('admin/stats', views.admin_dashboard_stats, name='admin_stats'),
    path('admin/users', views.get_admin_users, name='admin_users'),
    path('admin/providers', views.get_admin_providers, name='admin_providers'),
    path('admin/service-requests', views.get_service_requests, name='get_all_requests'),
    path('admin/service-requests/<int:id>/update-status', views.update_service_status, name='update_status'),
    path('admin/reviews/all', views.get_all_reviews, name='get_all_reviews'),
    path('admin/reviews', views.get_admin_reviews, name='admin_reviews'),
    path('admin/reviews/<int:id>/status', views.update_review_status, name='review_status'),


    # Admin & Service Management (monika-new branch CRUD)
    path('services', views.create_service),
    path('services/<int:id>', views.update_service),
    path('services/delete/<int:id>', views.delete_service),
    path('services/all', views.get_services),

    # Admin & Provider Management (monika-new branch CRUD)
    path('providers', views.create_provider),
    path('providers/<int:id>', views.update_provider),
    path('providers/delete/<int:id>', views.delete_provider),
    path('providers/all', views.get_providers),

]