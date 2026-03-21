from django.urls import path
from api_core import views
urlpatterns = [
    path('register/', views.register),
    path('login/',    views.login),
    path('me/',       views.get_me),
]
