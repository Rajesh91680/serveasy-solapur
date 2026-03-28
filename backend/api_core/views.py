from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Address, Service, Provider, User, ProviderStatus, Booking
from .serializers import (
    AddressSerializer, ServiceSerializer, ProviderSerializer,
    UserSerializer, RegisterSerializer, LoginSerializer,
    ProviderStatusSerializer, BookingSerializer
)
from datetime import timedelta
from django.utils.timezone import now
from .utils import generate_otp, send_otp_email

# from .utils import send_whatsapp_message
# =========================
# AUTH & USER
# =========================

#otp genartion 

@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    if user.otp_created_at and now() > user.otp_created_at + timedelta(minutes=5):
        return Response({'error': 'OTP expired'}, status=400)

    if user.email_otp == otp:
        user.is_verified = True
        user.email_otp = None
        user.save()
        return Response({'message': 'Email verified successfully'})

    return Response({'error': 'Invalid OTP'}, status=400)
#resend th otp
@api_view(['POST'])
def resend_otp(request):
    email = request.data.get('email')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    otp = generate_otp()
    user.email_otp = otp
    user.otp_created_at = now()
    user.save()

    send_otp_email(email, otp)

    return Response({'message': 'OTP resent successfully'})

# @api_view(['POST'])
# def register(request):
#     serializer = RegisterSerializer(data=request.data)
#     if serializer.is_valid():
#         if User.objects.filter(email=serializer.validated_data['email']).exists():
#             return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

#         user = serializer.save()
#         return Response({
#             'message': 'User registered successfully.',
#             'user_id': user.id
#         }, status=status.HTTP_201_CREATED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# @api_view(['POST'])
# def register(request):
#     serializer = RegisterSerializer(data=request.data)

#     if serializer.is_valid():
#         email = serializer.validated_data['email']

#         if User.objects.filter(email=email).exists():
#             return Response({'error': 'Email already exists.'}, status=400)

#         # ✅ Generate OTP
#         otp = generate_otp()

#         # ✅ Save user first
#         user = serializer.save()

#         # ✅ THEN set OTP manually (IMPORTANT FIX)
#         user.email_otp = otp
#         user.otp_created_at = now()
#         user.is_verified = False
#         user.save()

#         # ✅ Send email
#         send_otp_email(email, otp)

#         return Response({
#             'message': 'OTP sent to email',
#             'user_id': user.id
#         }, status=201)

#     return Response(serializer.errors, status=400)
    
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    # ❌ Validation error
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    email = serializer.validated_data['email']
    phone = serializer.validated_data['phone']

    # 🔥 STEP 1: CHECK EXISTING USER (PHONE FIRST)
    existing_user = User.objects.filter(phone=phone).first()

    if not existing_user:
        existing_user = User.objects.filter(email=email).first()

    # =========================
    # CASE 1: USER EXISTS
    # =========================
    if existing_user:

        # ❌ Already verified
        if existing_user.is_verified:
            return Response(
                {'error': 'User already exists. Please login.'},
                status=400
            )

        # 🔥 CHECK EMAIL CONFLICT (IMPORTANT)
        email_conflict = User.objects.filter(email=email).exclude(id=existing_user.id).first()
        if email_conflict:
            return Response(
                {'error': 'This email is already used by another account.'},
                status=400
            )

        # 🔥 Generate OTP
        otp = generate_otp()

        # ✅ UPDATE USER DATA
        existing_user.email = email
        existing_user.phone = phone
        existing_user.name = serializer.validated_data.get('name', existing_user.name)
        existing_user.title = serializer.validated_data.get('title', existing_user.title)
        existing_user.address_line = serializer.validated_data.get('address_line', existing_user.address_line)
        existing_user.city = serializer.validated_data.get('city', existing_user.city)
        existing_user.area = serializer.validated_data.get('area', existing_user.area)
        existing_user.pin_code = serializer.validated_data.get('pin_code', existing_user.pin_code)

        existing_user.email_otp = otp
        existing_user.otp_created_at = now()

        existing_user.save()

        # ✅ SEND OTP
        send_otp_email(email, otp)

        print("OTP:", otp, "sent to:", email)

        return Response({
            'message': 'OTP resent to existing user',
            'user_id': existing_user.id
        }, status=200)

    # =========================
    # CASE 2: NEW USER
    # =========================
    # 🔥 CHECK EMAIL UNIQUE FOR NEW USER
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already exists.'},
            status=400
        )

    otp = generate_otp()

    user = serializer.save()
    user.email_otp = otp
    user.otp_created_at = now()
    user.is_verified = False
    user.save()

    send_otp_email(email, otp)

    print("OTP:", otp, "sent to:", email)

    return Response({
        'message': 'OTP sent to email',
        'user_id': user.id
    }, status=201)
# @api_view(['POST'])
# def login(request):
#     serializer = LoginSerializer(data=request.data)
#     if serializer.is_valid():
#         email = serializer.validated_data['email']
#         password = serializer.validated_data['password']

#         try:
#             user = User.objects.get(email=email, password=password)
#             return Response({
#                 'message': 'Login successful.',
#                 'user': UserSerializer(user).data
#             }, status=status.HTTP_200_OK)

#         except User.DoesNotExist:
#             return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email)

            # ✅ Check password
            if user.password != password:
                return Response({'error': 'Invalid password'}, status=401)

            # ✅ Check verification
            if not user.is_verified:
                return Response({'error': 'Please verify your email first'}, status=403)

            return Response({
                'message': 'Login successful.',
                'user': UserSerializer(user).data
            })

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

    return Response(serializer.errors, status=400)

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


# =========================
# PROVIDER STATUS (NEW ✅)
# =========================

# @api_view(['PATCH'])
# def save_wa_sent(request, provider_id):
#     """Save that WhatsApp message was sent to this provider from this user."""
#     user_id = request.data.get('user_id')
#     description = request.data.get('description', '')
    
#     if not user_id:
#         return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)

#     # Use update_or_create to handle retries or updates
#     status_obj, created = ProviderStatus.objects.update_or_create(
#         provider_id=provider_id, 
#         user_id=user_id,
#         defaults={'wa_sent': True, 'description': description}
#     )
    
#     return Response(ProviderStatusSerializer(status_obj).data)

@api_view(['PATCH'])
def save_wa_sent(request, provider_id):
    user_id = request.data.get('user_id')
    description = request.data.get('description', '')

    if not user_id:
        return Response({'error': 'user_id is required'}, status=400)

    status_obj, created = ProviderStatus.objects.update_or_create(
        provider_id=provider_id,
        user_id=user_id,
        defaults={
            'wa_sent': True,
            'description': description
        }
    )

    return Response(ProviderStatusSerializer(status_obj).data)
@api_view(['PATCH'])
def save_provider_response(request, provider_id):
    """Save provider YES / NO response for a user."""
    user_id = request.data.get('user_id')
    availability = request.data.get('availability') # 'yes' or 'no'
    
    if not user_id:
        return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        status_obj = ProviderStatus.objects.get(provider_id=provider_id, user_id=user_id)
        status_obj.availability = availability
        status_obj.save()
        return Response(ProviderStatusSerializer(status_obj).data)
    except ProviderStatus.DoesNotExist:
        return Response({'error': 'Status record not found. Send WhatsApp first.'}, status=404)


@api_view(['PATCH'])
def confirm_provider(request, provider_id):
    """Mark a provider as confirmed by the user."""
    user_id = request.data.get('user_id')
    confirmed = request.data.get('confirmed', True)
    
    if not user_id:
        return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        status_obj = ProviderStatus.objects.get(provider_id=provider_id, user_id=user_id)
        status_obj.confirmed = confirmed
        status_obj.save()
        return Response(ProviderStatusSerializer(status_obj).data)
    except ProviderStatus.DoesNotExist:
        return Response({'error': 'Status record not found.'}, status=404)


@api_view(['GET'])
def get_provider_status(request):
    """Get status of all providers contacted by this user."""
    user_id = request.query_params.get('user_id')
    if not user_id:
        return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    statuses = ProviderStatus.objects.filter(user_id=user_id)
    return Response(ProviderStatusSerializer(statuses, many=True).data)


# =========================
# BOOKINGS (NEW ✅)
# =========================

@api_view(['POST'])
def create_booking(request):
    """Create a new booking record."""
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)