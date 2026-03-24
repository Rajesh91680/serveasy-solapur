from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from .models import ServiceRequest, Review
from .serializers import ServiceRequestSerializer, ReviewSerializer

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_service_request(request):
    serializer = ServiceRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Booking created.", "data": serializer.data}, status=201)
    return Response({"message": "Invalid data.", "errors": serializer.errors}, status=400)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_requests_by_user(request, user_id):
    bookings = ServiceRequest.objects.filter(user_id=user_id)
    serializer = ServiceRequestSerializer(bookings, many=True)
    return Response({"message": f"Bookings for user {user_id}", "count": bookings.count(), "data": serializer.data})

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_requests_by_provider(request, provider_id):
    bookings = ServiceRequest.objects.filter(provider_id=provider_id)
    serializer = ServiceRequestSerializer(bookings, many=True)
    return Response({"message": f"Bookings for provider {provider_id}", "count": bookings.count(), "data": serializer.data})

@api_view(['GET', 'PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
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

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_review(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Review submitted.", "data": serializer.data}, status=201)
    return Response({"message": "Invalid data.", "errors": serializer.errors}, status=400)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_reviews_by_provider(request, provider_id):
    reviews = Review.objects.filter(provider_id=provider_id)
    serializer = ReviewSerializer(reviews, many=True)
    return Response({"message": f"Reviews for provider {provider_id}", "count": reviews.count(), "data": serializer.data})

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_review_detail(request, pk):
    try:
        review = Review.objects.get(pk=pk)
    except Review.DoesNotExist:
        return Response({"message": "Review not found."}, status=404)
    return Response({"message": "Review found.", "data": ReviewSerializer(review).data})
