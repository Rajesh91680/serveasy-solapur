from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Address, Service, Provider, User
from .serializers import (
    AddressSerializer, ServiceSerializer, ProviderSerializer,
    UserSerializer, RegisterSerializer, LoginSerializer
)


# =========================
# AUTH & USER
# =========================

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        if User.objects.filter(email=serializer.validated_data['email']).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        return Response({
            'message': 'User registered successfully.',
            'user_id': user.id
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email, password=password)
            return Response({
                'message': 'Login successful.',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        return Response(UserSerializer(user).data)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_user(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated.', 'user': serializer.data})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)


# =========================
# SERVICES
# =========================

@api_view(['GET'])
def get_services(request):
    services = Service.objects.all()
    return Response(ServiceSerializer(services, many=True).data)


@api_view(['GET'])
def get_service_detail(request, pk):
    try:
        service = Service.objects.get(pk=pk)
        return Response(ServiceSerializer(service).data)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)


# =========================
# PROVIDERS
# =========================

@api_view(['GET'])
def get_providers(request):
    providers = Provider.objects.all()
    return Response(ProviderSerializer(providers, many=True).data)


@api_view(['GET'])
def get_providers_by_service(request, service_id):
    providers = Provider.objects.filter(service_id=service_id)
    return Response(ProviderSerializer(providers, many=True).data)


@api_view(['GET'])
def get_provider_detail(request, pk):
    try:
        provider = Provider.objects.get(pk=pk)
        return Response(ProviderSerializer(provider).data)
    except Provider.DoesNotExist:
        return Response({'error': 'Provider not found.'}, status=status.HTTP_404_NOT_FOUND)


# =========================
# ADDRESS (FIXED ✅)
# =========================

@api_view(['POST'])
def create_address(request):
    serializer = AddressSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data.get('user')
        is_default = serializer.validated_data.get('is_default', False)

        # ✅ Fix: use user (ForeignKey)
        if is_default:
            Address.objects.filter(user=user).update(is_default=False)

        address = serializer.save()
        return Response(AddressSerializer(address).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user_addresses(request, user_id):
    # ✅ Fix: use user_id with ForeignKey
    addresses = Address.objects.filter(user_id=user_id)
    return Response(AddressSerializer(addresses, many=True).data)


@api_view(['GET', 'PUT', 'DELETE'])
def address_detail(request, pk):
    try:
        address = Address.objects.get(pk=pk)
    except Address.DoesNotExist:
        return Response({'error': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(AddressSerializer(address).data)

    elif request.method == 'PUT':
        is_default = request.data.get('is_default', False)

        # ✅ Fix: use address.user
        if is_default:
            Address.objects.filter(user=address.user).update(is_default=False)

        serializer = AddressSerializer(address, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        address.delete()
        return Response({'message': 'Address deleted successfully.'})


@api_view(['GET'])
def get_all_addresses(request):
    addresses = Address.objects.all()
    return Response(AddressSerializer(addresses, many=True).data)