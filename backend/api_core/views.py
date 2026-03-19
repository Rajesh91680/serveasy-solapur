# views.py
# This file contains the logic for each API endpoint.
# It receives the request, processes it, talks to the database, and returns a response.
# Member 1 - Authentication & Profile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


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