from django.urls import path
from api_core import views

urlpatterns = [
    # POST  /api/reviews/                      → Create review
    path('',                                views.create_review,            name='create-review'),

    # GET   /api/reviews/provider/1/           → Get reviews by provider
    path('provider/<int:provider_id>/',     views.get_reviews_by_provider,  name='reviews-by-provider'),

    # GET   /api/reviews/1/                    → Get single review
    path('<int:pk>/',                       views.get_review_detail,        name='review-detail'),
]