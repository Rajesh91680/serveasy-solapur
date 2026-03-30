from django.urls import path
from . import views

urlpatterns = [

    # SERVICE REQUEST
    path("service-requests/", views.ServiceRequestListCreate.as_view()),
    path("service-requests/user/<int:user_id>/", views.ServiceRequestByUser.as_view()),
    path("service-requests/provider/<int:provider_id>/", views.ServiceRequestByProvider.as_view()),
    path("service-requests/<int:pk>/", views.ServiceRequestDetail.as_view()),

    # REVIEWS
    path("reviews/", views.ReviewListCreate.as_view()),
    path("reviews/provider/<int:provider_id>/", views.ReviewByProvider.as_view()),
    path("reviews/<int:pk>/", views.ReviewDetail.as_view()),
]