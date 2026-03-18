from django.urls import path
from . import views

urlpatterns = [
    path('auth/register',  views.register,    name='register'),
    path('auth/login',     views.login,        name='login'),
    path('users/<int:id>', views.get_user,     name='get_user'),
    path('users/<int:id>/update', views.update_user, name='update_user'),
]