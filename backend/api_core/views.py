from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Address, Service, Provider
from .serializers import AddressSerializer, ServiceSerializer, ProviderSerializer


# ─── Service Views ────────────────────────────────────────────────────────────

@api_view(['GET'])
def get_services(request):
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_service_detail(request, pk):
    try:
        service = Service.objects.get(pk=pk)
        serializer = ServiceSerializer(service)
        return Response(serializer.data)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)


# ─── Provider Views ───────────────────────────────────────────────────────────

@api_view(['GET'])
def get_providers(request):
    providers = Provider.objects.all()
    serializer = ProviderSerializer(providers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_providers_by_service(request, service_id):
    providers = Provider.objects.filter(service_id=service_id)
    serializer = ProviderSerializer(providers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_provider_detail(request, pk):
    try:
        provider = Provider.objects.get(pk=pk)
        serializer = ProviderSerializer(provider)
        return Response(serializer.data)
    except Provider.DoesNotExist:
        return Response({'error': 'Provider not found.'}, status=status.HTTP_404_NOT_FOUND)



# ─── POST /api/addresses ───────────────────────────────────────────────────────
# Create a new address

@api_view(['POST'])
def create_address(request):
    serializer = AddressSerializer(data=request.data)
    if serializer.is_valid():
        user_id = request.data.get('user_id')
        is_default = request.data.get('is_default', False)

        # If this address is being set as default, unset all others for this user
        if is_default:
            Address.objects.filter(user_id=user_id).update(is_default=False)

        address = serializer.save()
        return Response(AddressSerializer(address).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─── GET /api/addresses/user/<user_id> ────────────────────────────────────────
# Get all addresses for a user

@api_view(['GET'])
def get_user_addresses(request, user_id):
    addresses = Address.objects.filter(user_id=user_id)
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data)


# ─── GET /PUT /DELETE /api/addresses/<id> ─────────────────────────────────────
# Get, update, or delete a single address

@api_view(['GET', 'PUT', 'DELETE'])
def address_detail(request, pk):
    try:
        address = Address.objects.get(pk=pk)
    except Address.DoesNotExist:
        return Response({'error': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AddressSerializer(address)
        return Response(serializer.data)

    elif request.method == 'PUT':
        is_default = request.data.get('is_default', False)

        # If setting as default, unset all others for same user
        if is_default:
            Address.objects.filter(user_id=address.user_id).update(is_default=False)

        serializer = AddressSerializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        address.delete()
        return Response({'message': 'Address deleted successfully.'}, status=status.HTTP_200_OK)

# Get all address
@api_view(['GET'])
def get_all_addresses(request):
    addresses = Address.objects.all()   # 👈 ALL addresses
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data)