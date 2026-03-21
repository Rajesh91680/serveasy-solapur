from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ServiceRequest, Review
from .serializers import ServiceRequestSerializer, ReviewSerializer


# ══════════════════════════════════════════════════════
#  MEMBER 1 — AUTH APIs
# ══════════════════════════════════════════════════════

@api_view(['POST'])
def register(request):
    return Response({"message": "Register - Member 1"}, status=200)

@api_view(['POST'])
def login(request):
    return Response({"message": "Login - Member 1"}, status=200)

@api_view(['GET'])
def get_me(request):
    return Response({"message": "Get current user - Member 1"}, status=200)


# ══════════════════════════════════════════════════════
#  MEMBER 1 — USER APIs
# ══════════════════════════════════════════════════════

@api_view(['GET', 'PUT'])
def user_detail(request, pk):
    return Response({"message": f"User {pk} - Member 1"}, status=200)


# ══════════════════════════════════════════════════════
#  MEMBER 2 — SERVICE APIs
# ══════════════════════════════════════════════════════

@api_view(['GET'])
def service_list(request):
    return Response({"message": "Service list - Member 2"}, status=200)

@api_view(['GET'])
def service_detail(request, pk):
    return Response({"message": f"Service {pk} - Member 2"}, status=200)


# ══════════════════════════════════════════════════════
#  MEMBER 2 — PROVIDER APIs
# ══════════════════════════════════════════════════════

@api_view(['GET'])
def provider_list(request):
    return Response({"message": "Provider list - Member 2"}, status=200)

@api_view(['GET'])
def provider_detail(request, pk):
    return Response({"message": f"Provider {pk} - Member 2"}, status=200)

@api_view(['GET'])
def providers_by_service(request, service_id):
    return Response({"message": f"Providers for service {service_id} - Member 2"}, status=200)


# ══════════════════════════════════════════════════════
#  MEMBER 2 — ADDRESS APIs
# ══════════════════════════════════════════════════════

@api_view(['POST'])
def create_address(request):
    return Response({"message": "Address created - Member 2"}, status=201)

@api_view(['GET'])
def user_addresses(request, user_id):
    return Response({"message": f"Addresses for user {user_id} - Member 2"}, status=200)

@api_view(['GET', 'PUT', 'DELETE'])
def address_detail(request, pk):
    return Response({"message": f"Address {pk} - Member 2"}, status=200)


# ══════════════════════════════════════════════════════
#  MEMBER 3 — BOOKING APIs
# ══════════════════════════════════════════════════════

@api_view(['POST'])
def create_service_request(request):
    serializer = ServiceRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Booking created.", "data": serializer.data}, status=201)
    return Response({"message": "Invalid data.", "errors": serializer.errors}, status=400)

@api_view(['GET'])
def get_requests_by_user(request, user_id):
    bookings = ServiceRequest.objects.filter(user_id=user_id)
    serializer = ServiceRequestSerializer(bookings, many=True)
    return Response({"message": f"Bookings for user {user_id}", "count": bookings.count(), "data": serializer.data})

@api_view(['GET'])
def get_requests_by_provider(request, provider_id):
    bookings = ServiceRequest.objects.filter(provider_id=provider_id)
    serializer = ServiceRequestSerializer(bookings, many=True)
    return Response({"message": f"Bookings for provider {provider_id}", "count": bookings.count(), "data": serializer.data})

@api_view(['GET', 'PUT'])
def service_request_detail(request, pk):
    try:
        booking = ServiceRequest.objects.get(pk=pk)
    except ServiceRequest.DoesNotExist:
        return Response({"message": "Booking not found."}, status=404)
    if request.method == 'GET':
        return Response({"message": "Booking found.", "data": ServiceRequestSerializer(booking).data})
    serializer = ServiceRequestSerializer(booking, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Booking updated.", "data": serializer.data})
    return Response({"message": "Invalid data.", "errors": serializer.errors}, status=400)


# ══════════════════════════════════════════════════════
#  MEMBER 3 — REVIEW APIs
# ══════════════════════════════════════════════════════

@api_view(['POST'])
def create_review(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Review submitted.", "data": serializer.data}, status=201)
    return Response({"message": "Invalid data.", "errors": serializer.errors}, status=400)

@api_view(['GET'])
def get_reviews_by_provider(request, provider_id):
    reviews = Review.objects.filter(provider_id=provider_id)
    serializer = ReviewSerializer(reviews, many=True)
    return Response({"message": f"Reviews for provider {provider_id}", "count": reviews.count(), "data": serializer.data})

@api_view(['GET'])
def get_review_detail(request, pk):
    try:
        review = Review.objects.get(pk=pk)
    except Review.DoesNotExist:
        return Response({"message": "Review not found."}, status=404)
    return Response({"message": "Review found.", "data": ReviewSerializer(review).data})


# ══════════════════════════════════════════════════════
#  MEMBER 4 & 5 — ADMIN APIs
# ══════════════════════════════════════════════════════

@api_view(['POST'])
def admin_login(request):
    return Response({"message": "Admin login - Member 5"}, status=200)

@api_view(['GET'])
def admin_users(request):
    return Response({"message": "Admin users - Member 5"}, status=200)

@api_view(['GET'])
def admin_providers(request):
    return Response({"message": "Admin providers - Member 5"}, status=200)

@api_view(['POST'])
def admin_create_provider(request):
    return Response({"message": "Admin create provider - Member 4"}, status=201)

@api_view(['GET', 'PUT', 'DELETE'])
def admin_provider_detail(request, pk):
    return Response({"message": f"Admin provider {pk} - Member 4"}, status=200)

@api_view(['GET'])
def admin_requests(request):
    return Response({"message": "Admin requests - Member 5"}, status=200)

@api_view(['GET'])
def admin_reviews(request):
    return Response({"message": "Admin reviews - Member 5"}, status=200)

@api_view(['GET'])
def admin_stats(request):
    return Response({"message": "Admin stats - Member 5"}, status=200)

@api_view(['POST'])
def admin_create_service(request):
    return Response({"message": "Admin create service - Member 4"}, status=201)

@api_view(['GET', 'PUT', 'DELETE'])
def admin_service_detail(request, pk):
    return Response({"message": f"Admin service {pk} - Member 4"}, status=200)
