from django.urls import path
from api_core import views
urlpatterns = [
    path('',         views.service_list),
    path('<int:pk>/', views.service_detail),
]
