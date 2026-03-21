from django.urls import path
from api_core import views
urlpatterns = [
    path('',               views.create_address),
    path('user/<int:user_id>/', views.user_addresses),
    path('<int:pk>/',      views.address_detail),
]
