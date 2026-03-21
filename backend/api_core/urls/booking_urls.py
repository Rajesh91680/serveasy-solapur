from django.urls import path
from api_core import views

urlpatterns = [
    # POST   /api/service-requests/                    → Create booking
    path('',                                views.create_service_request,   name='create-booking'),

    # GET    /api/service-requests/user/1/             → Get bookings by user
    path('user/<int:user_id>/',             views.get_requests_by_user,     name='bookings-by-user'),

    # GET    /api/service-requests/provider/1/         → Get bookings by provider
    path('provider/<int:provider_id>/',     views.get_requests_by_provider, name='bookings-by-provider'),

    # GET    /api/service-requests/1/                  → Get single booking
    # PUT    /api/service-requests/1/                  → Update booking status
    path('<int:pk>/',                       views.service_request_detail,   name='booking-detail'),
]