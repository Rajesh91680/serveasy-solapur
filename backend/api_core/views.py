# views.py
# This file contains the logic for each API endpoint.
# It receives the request, processes it, talks to the database, and returns a response.
# Member 1 - Authentication & Profile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .models import Service, Provider
from .serializers import ServiceSerializer, ProviderSerializer


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
    Update provider details by ID
    """

    try:
        provider = Provider.objects.get(id=id)
    except Provider.DoesNotExist:
        return Response({
            "error": "Provider not found"
        }, status=status.HTTP_404_NOT_FOUND)

    serializer = ProviderSerializer(provider, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Provider updated successfully",
            "data": serializer.data
        })

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