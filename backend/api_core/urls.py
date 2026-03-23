from django.urls import path
from .views import (
    create_address, get_user_addresses, address_detail, get_all_addresses,  # ✅ comma added
    get_services, get_service_detail,
    get_providers, get_providers_by_service, get_provider_detail
)

urlpatterns = [
    

    # Service endpoints
    path('services/', get_services, name='get_services'),
    path('services/<int:pk>/', get_service_detail, name='service_detail'),

    # Provider endpoints
    path('providers/', get_providers, name='get_providers'),
    path('providers/service/<int:service_id>/', get_providers_by_service, name='providers_by_service'),
    path('providers/<int:pk>/', get_provider_detail, name='provider_detail'),

    # Address endpoints
    # path('addresses/', create_address, name='create_address'),                      # POST
    # path('addresses/user/<str:user_id>/', get_user_addresses, name='user_addresses'),  # GET
    # path('addresses/<int:pk>/', address_detail, name='address_detail'),             # GET, PUT, DELETE
    # path('addresses/', get_all_addresses),
    path('addresses/', get_all_addresses),   # ✅ GET ALL
    path('addresses/create/', create_address),  # ✅ POST
    path('addresses/user/<str:user_id>/', get_user_addresses),
    path('addresses/<int:pk>/', address_detail),
]
