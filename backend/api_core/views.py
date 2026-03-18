from django.shortcuts import render


#API NAME: Admin Dashboard Stats API (AdminDashboard.js)


from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import TempUser, TempProvider, TempServiceRequest, TempReview


@api_view(['GET'])
def admin_dashboard_stats(request):
    """
    Fetch total counts for dashboard
    """

    total_users = TempUser.objects.count()
    total_providers = TempProvider.objects.count()
    total_requests = TempServiceRequest.objects.count()
    total_reviews = TempReview.objects.count()   # ✅ fixed indentation

    data = {
        "total_users": total_users,
        "total_providers": total_providers,
        "total_requests": total_requests,
        "total_reviews": total_reviews
    }

    return Response(data)