from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import User, Service, Provider
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    ServiceSerializer,
    ProviderSerializer
)

# =========================================================
# 🔹 AUTH APIs
# =========================================================

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        if User.objects.filter(email=serializer.validated_data['email']).exists():
            return Response({'error': 'Email already exists'}, status=400)

        user = serializer.save()
        return Response({
            'message': 'User registered successfully',
            'user_id': user.id
        }, status=201)

    return Response(serializer.errors, status=400)


@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email, password=password)
            return Response({
                'message': 'Login successful',
                'user': UserSerializer(user).data
            }, status=200)

        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=401)

    return Response(serializer.errors, status=400)


# =========================================================
# 🔹 USER APIs
# =========================================================

@api_view(['GET'])
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        return Response(UserSerializer(user).data)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(['PUT'])
def update_user(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    serializer = UserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Profile updated',
            'user': serializer.data
        })

    return Response(serializer.errors, status=400)


# =========================================================
# 🔹 SERVICE APIs
# =========================================================

# CREATE
@api_view(['POST'])
def create_service(request):
    serializer = ServiceSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Service created successfully',
            'data': serializer.data
        }, status=201)

    return Response(serializer.errors, status=400)


# GET ALL
@api_view(['GET'])
def get_services(request):
    services = Service.objects.all().order_by('-id')
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


# UPDATE
@api_view(['PUT'])
def update_service(request, id):
    try:
        service = Service.objects.get(id=id)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=404)

    serializer = ServiceSerializer(service, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Service updated successfully',
            'data': serializer.data
        })

    return Response(serializer.errors, status=400)


# DELETE
@api_view(['DELETE'])
def delete_service(request, id):
    try:
        service = Service.objects.get(id=id)
        service.delete()
        return Response({'message': 'Service deleted successfully'})
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=404)


# =========================================================
# 🔹 PROVIDER APIs
# =========================================================

# CREATE
@api_view(['POST'])
def create_provider(request):
    print("DATA:", request.data)  # 🔥 debug

    serializer = ProviderSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Provider created successfully',
            'data': serializer.data
        }, status=201)

    print("ERRORS:", serializer.errors)  # 🔥 debug
    return Response(serializer.errors, status=400)


# GET ALL
@api_view(['GET'])
def get_providers(request):
    providers = Provider.objects.all().order_by('-id')
    serializer = ProviderSerializer(providers, many=True)
    return Response(serializer.data)


# GET BY ID ✅ (FIXED MAIN ISSUE)
@api_view(['GET'])
def get_provider_by_id(request, id):
    try:
        provider = Provider.objects.get(id=id)
        serializer = ProviderSerializer(provider)
        return Response(serializer.data, status=200)

    except Provider.DoesNotExist:
        return Response({'error': 'Provider not found'}, status=404)


# UPDATE
@api_view(['PUT'])
def update_provider(request, id):
    try:
        provider = Provider.objects.get(id=id)
    except Provider.DoesNotExist:
        return Response({'error': 'Provider not found'}, status=404)

    serializer = ProviderSerializer(provider, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Provider updated successfully',
            'data': serializer.data
        })

    return Response(serializer.errors, status=400)


# DELETE
@api_view(['DELETE'])
def delete_provider(request, id):
    try:
        provider = Provider.objects.get(id=id)
        provider.delete()
        return Response({'message': 'Provider deleted successfully'})
    except Provider.DoesNotExist:
        return Response({'error': 'Provider not found'}, status=404)