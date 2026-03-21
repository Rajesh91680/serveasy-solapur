from django.urls import path
from api_core import views
urlpatterns = [
    path('<int:pk>/', views.user_detail),
]
