from django.urls import path
from api_core import views
urlpatterns = [
    path('',                        views.provider_list),
    path('service/<int:service_id>/', views.providers_by_service),
    path('<int:pk>/',               views.provider_detail),
]
