# from django.urls import path
# from . import views

# urlpatterns = [
#     # GET  — returns all providers for React dropdown
#     path("providers/",        views.get_providers, name="get_providers"),

#     # POST — ProviderList.js posts to this URL:
#     #        fetch(`${API_BASE}/api/service-requests/`, { method:"POST", ... })
#     path("service-requests/", views.book_service,  name="book_service"),

#     # GET  — debug: see all saved bookings
#     path("bookings/",         views.get_bookings,  name="get_bookings"),
# ]





from django.urls import path
from . import views

urlpatterns = [
    path("service-requests/", views.service_requests, name="service_requests"),
]