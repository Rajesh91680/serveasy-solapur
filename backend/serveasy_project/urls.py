# from django.contrib import admin
# from django.urls import path, include
# from django.conf import settings
# from django.conf.urls.static import static
# from django.http import JsonResponse

# def home(request):
#     return JsonResponse({
#         "message": "ServeEasy API is running",
#         "status": "ok",
#         "endpoints": {
#             "auth":             "/api/auth/",
#             "users":            "/api/users/",
#             "services":         "/api/services/",
#             "providers":        "/api/providers/",
#             "addresses":        "/api/addresses/",
#             "service_requests": "/api/service-requests/",
#             "reviews":          "/api/reviews/",
#             "admin_api":        "/api/admin/",
#             "django_admin":     "/admin/",
#         }
#     })

# urlpatterns = [
#     path("", home),
#     path('admin/', admin.site.urls),
#     path('api/auth/',             include('api_core.urls.auth_urls')),
#     path('api/users/',            include('api_core.urls.user_urls')),
#     path('api/services/',         include('api_core.urls.service_urls')),
#     path('api/providers/',        include('api_core.urls.provider_urls')),
#     path('api/addresses/',        include('api_core.urls.address_urls')),
#     path('api/service-requests/', include('api_core.urls.booking_urls')),
#     path('api/reviews/',          include('api_core.urls.review_urls')),
#     path('api/admin/',            include('api_core.urls.admin_urls')),
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def home(request):
    return JsonResponse({
        "message": "ServeEasy API is running",
        "status": "ok",
        "endpoints": {
            "auth":             "/api/auth/",
            "users":            "/api/users/",
            "services":         "/api/services/",
            "providers":        "/api/providers/",
            "addresses":        "/api/addresses/",
            "service_requests": "/api/service-requests/",
            "reviews":          "/api/reviews/",
            "admin_api":        "/api/admin/",
            "django_admin":     "/admin/",
            "token":            "/api/token/",
            "token_refresh":    "/api/token/refresh/",
        }
    })

urlpatterns = [
    path("", home),
    path('admin/', admin.site.urls),

    # JWT Token URLs
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App URLs
    path('api/auth/',             include('api_core.urls.auth_urls')),
    path('api/users/',            include('api_core.urls.user_urls')),
    path('api/services/',         include('api_core.urls.service_urls')),
    path('api/providers/',        include('api_core.urls.provider_urls')),
    path('api/addresses/',        include('api_core.urls.address_urls')),
    path('api/service-requests/', include('api_core.urls.booking_urls')),
    path('api/reviews/',          include('api_core.urls.review_urls')),
    path('api/admin/',            include('api_core.urls.admin_urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)