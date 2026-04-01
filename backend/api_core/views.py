# views.py
# This file contains the logic for each API endpoint.
# It receives the request, processes it, talks to the database, and returns a response.
# Member 1 - Authentication & Profile

# ORM (Object Relational Mapping):
# This file uses Django ORM written in Python to perform database operations.
# Instead of writing raw SQL queries, we use Python methods provided by Django ORM.
# Language used: Python (Django ORM)
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Provider, Service, Review, ServiceRequest
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .models import Service, Provider
from .serializers import ServiceSerializer, ProviderSerializer
from .serializers import (# Serializer Imports
    UserSerializer, 
    RegisterSerializer, 
    LoginSerializer, 
    ServiceSerializer, 
    ProviderSerializer, 
    ReviewSerializer, 
    ServiceRequestSerializer  # Make sure this one is here!
)

# POST /api/auth/register
# Receives signup form data and creates a new user in the database.
# Used when the user submits the Create Account form.
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        if User.objects.filter(email=serializer.validated_data['email']).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        return Response({'message': 'User registered successfully.', 'user_id': user.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# POST /api/auth/login
# Receives email and password, checks the database, and returns user data if matched.
# Used when the user submits the Login form.
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email    = serializer.validated_data['email']
        password = serializer.validated_data['password']
        try:
            user = User.objects.get(email=email, password=password)
            return Response({'message': 'Login successful.', 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# GET /api/users/<id>
# Fetches a single user's profile data by their ID.
# Used when the user profile page loads.
@api_view(['GET'])
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)


# PUT /api/users/<id>/update
# Updates an existing user's profile data.
# Used when the user saves changes on the profile edit page.
@api_view(['PUT'])
def update_user(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated.', 'user': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    

# Admin & Service Management
# ================================
# IMPORTS
# ================================



# =========================================================
# 🔹 SERVICES APIs (Admin Side)
# =========================================================

# ----------------------------------------
# CREATE SERVICE
# API: POST /api/services
# ----------------------------------------
@api_view(['POST'])
def create_service(request):
    """
    Create a new service
    Request Body:
    {
        "name": "Plumbing",
        "category": "Home",
        "description": "Pipe fixing",
        "status": "active"
    }
    """

    serializer = ServiceSerializer(data=request.data)

    # Validate data
    if serializer.is_valid():
        serializer.save()  # Save to DB using ORM
        return Response({
            "message": "Service created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    # If validation fails
    return Response({
        "error": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


# ----------------------------------------
# UPDATE SERVICE
# API: PUT /api/services/:id
# ----------------------------------------
@api_view(['PUT'])
def update_service(request, id):
    """
    Update an existing service by ID
    """

    try:
        service = Service.objects.get(id=id)
    except Service.DoesNotExist:
        return Response({
            "error": "Service not found"
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = ServiceSerializer(service, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Service updated successfully",
            "data": serializer.data
        })

    return Response({
        "error": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


# ----------------------------------------
# DELETE SERVICE
# API: DELETE /api/services/:id
# ----------------------------------------
@api_view(['DELETE'])
def delete_service(request, id):
    """
    Delete a service by ID
    """

    try:
        service = Service.objects.get(id=id)
        service.delete()

        return Response({
            "message": "Service deleted successfully"
        })

    except Service.DoesNotExist:
        return Response({
            "error": "Service not found"
        }, status=status.HTTP_404_NOT_FOUND)


# =========================================================
# 🔹 PROVIDERS APIs (Admin Side)
# =========================================================

# ----------------------------------------
# CREATE PROVIDER
# API: POST /api/providers
# ----------------------------------------
@api_view(['POST'])
def create_provider(request):
    """
    Create a new provider (supports image upload)
    Request Type: multipart/form-data
    Fields:
    - name
    - specialty
    - location
    - experience
    - phone
    - aadhaar_number
    - photo (file)
    - aadhaar_image (file)
    """

    serializer = ProviderSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Provider created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    return Response({
        "error": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


# ----------------------------------------
# UPDATE PROVIDER
# API: PUT /api/providers/:id
# ----------------------------------------
@api_view(['PUT'])
def update_provider(request, id):
    """
    Update provider details by ID (Supports partial updates like just status)
    """

    try:
        provider = Provider.objects.get(id=id)
    except Provider.DoesNotExist:
        return Response({
            "error": "Provider not found"
        }, status=status.HTTP_404_NOT_FOUND)

    # 🔹 ADDED partial=True HERE
    serializer = ProviderSerializer(provider, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Provider updated successfully",
            "data": serializer.data
        })
    
    # 🔹 LOGGING: This helps us see errors in the terminal if it still fails
    print("SERIALIZER ERRORS:", serializer.errors)

    return Response({
        "error": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

# ----------------------------------------
# DELETE PROVIDER
# API: DELETE /api/providers/:id
# ----------------------------------------
@api_view(['DELETE'])
def delete_provider(request, id):
    """
    Delete a provider by ID
    """

    try:
        provider = Provider.objects.get(id=id)
        provider.delete()

        return Response({
            "message": "Provider deleted successfully"
        })

    except Provider.DoesNotExist:
        return Response({
            "error": "Provider not found"
        }, status=status.HTTP_404_NOT_FOUND)


# =========================================================
# 🔹 OPTIONAL (VERY USEFUL FOR FRONTEND)
# =========================================================

# ----------------------------------------
# GET ALL SERVICES
# API: GET /api/services
# ----------------------------------------
@api_view(['GET'])
def get_services(request):
    """
    Fetch all services (used in AdminServices UI)
    """

    services = Service.objects.all().order_by('-id')
    serializer = ServiceSerializer(services, many=True)

    return Response(serializer.data)


# ----------------------------------------
# GET ALL PROVIDERS
# API: GET /api/providers
# ----------------------------------------
@api_view(['GET'])
def get_providers(request):
    """
    Fetch all providers (used in AdminProviders UI)
    """

    providers = Provider.objects.all().order_by('-id')
    serializer = ProviderSerializer(providers, many=True)

    return Response(serializer.data)


# =========================================================
# 🔹 REVIEWS APIs (User Side)
# =========================================================

# POST /api/reviews/submit
# This API receives the rating, review text, and work photo to save in the database.
@api_view(['POST'])
def submit_review(request):
    """
    Saves a user's service review and work photo to the database.
    Request Type: multipart/form-data
    """
    serializer = ReviewSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Review submitted successfully!",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    return Response({
        "error": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


    # =========================================================
# 🔹 ADMIN APIs (Review Management)
# =========================================================

# GET /api/admin/reviews/all
# This API fetches all service reviews from the database for the Admin dashboard.
# It returns a list of all ratings, comments, and work photo URLs.
@api_view(['GET'])
def get_all_reviews(request):
    """
    Fetch all reviews stored in the database.
    Used by the Admin to monitor service quality.
    """
    # Fetching all reviews and ordering by newest first
    reviews = Review.objects.all().order_by('-created_at')
    
    # Converting database objects into JSON format
    serializer = ReviewSerializer(reviews, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


# =========================================================
# 🔹 ADMIN DASHBOARD STATS API
# =========================================================

# GET /api/admin/stats
# This API fetches the total counts from all main tables (Users, Providers, Bookings, Reviews).
# It is used to show the "Big Numbers" on the Admin Dashboard screen.
@api_view(['GET'])
def admin_dashboard_stats(request):
    """
    Fetch real-time statistics from PostgreSQL for the Admin Dashboard.
    """
    # 1. Count Total Customers (excluding anyone with an admin role if applicable)
    total_users = User.objects.count()

    # 2. Count Total Service Providers
    total_providers = Provider.objects.count()
    active_providers = Provider.objects.filter(status="active").count()

    # 3. Count Service Bookings (Total and Completed)
    total_requests = ServiceRequest.objects.count()
    completed_requests = ServiceRequest.objects.filter(status="completed").count()

    # 4. Count Total Feedback/Reviews received
    total_reviews = Review.objects.count()

    # Prepare the data package to send to React
    data = {
        "total_users": total_users,
        "total_providers": total_providers,
        "active_providers": active_providers,
        "total_requests": total_requests,
        "completed_requests": completed_requests,
        "total_reviews": total_reviews
    }

    return Response(data)


# GET /api/admin/service-requests
# Fetches all bookings from PostgreSQL for the Admin to view.
@api_view(['GET'])
def get_service_requests(request):
    requests = ServiceRequest.objects.all().order_by('-id')
    serializer = ServiceRequestSerializer(requests, many=True)
    return Response(serializer.data)

# PUT /api/admin/service-requests/<id>/update-status
# Updates the status of a booking (e.g., requested -> confirmed).
@api_view(['PUT'])
def update_service_status(request, id):
    try:
        service_req = ServiceRequest.objects.get(id=id)
        # We only update the 'status' field from the request body
        service_req.status = request.data.get('status', service_req.status)
        service_req.save()
        return Response({"message": "Status updated successfully", "status": service_req.status})
    except ServiceRequest.DoesNotExist:
        return Response({"error": "Request not found"}, status=404)


        # GET /api/admin/users
# Fetches all registered customers for the Admin table
@api_view(['GET'])
def get_admin_users(request):
    # Exclude admins so we only see customers
    users = User.objects.exclude(role='admin').order_by('-id')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# GET /api/admin/providers
# Fetches all technicians/service providers for the Admin
@api_view(['GET'])
def get_admin_providers(request):
    providers = Provider.objects.all().order_by('-id')
    serializer = ProviderSerializer(providers, many=True)
    return Response(serializer.data)


# PUT /api/providers/<id>
# This API updates provider details (like status: active/inactive)
@api_view(['PUT'])
def update_provider_details(request, id):
    try:
        provider = Provider.objects.get(id=id)
        
        # 'partial=True' allows us to update only the 'status' field 
        # without sending all other fields again.
        serializer = ProviderSerializer(provider, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found"}, status=404)

        # GET /api/admin/reviews
@api_view(['GET'])
def get_admin_reviews(request):
    reviews = Review.objects.all().order_by('-created_at')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

# PUT /api/admin/reviews/<id>/status
@api_view(['PUT'])
def update_review_status(request, id):
    try:
        review = Review.objects.get(id=id)
        # We update the status (e.g., approved, rejected)
        review.status = request.data.get('status', review.status)
        review.save()
        return Response({"message": "Review updated"})
    except Review.DoesNotExist:
        return Response({"error": "Not found"}, status=404)