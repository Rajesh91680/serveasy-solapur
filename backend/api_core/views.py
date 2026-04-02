from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
from django.http import HttpResponse
from .models import User, Service, Provider, Address, ProviderStatus, Booking, Review, ServiceRequest
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer, 
    ServiceSerializer, ProviderSerializer, AddressSerializer,
    ProviderStatusSerializer, BookingSerializer, 
    ReviewSerializer, ServiceRequestSerializer
)
from .utils import generate_otp, send_otp_email


# -------------------------
# Authentication & OTP
# -------------------------

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    email = serializer.validated_data['email']
    phone = serializer.validated_data['phone']

    existing_user = User.objects.filter(phone=phone).first()
    if not existing_user:
        existing_user = User.objects.filter(email=email).first()

    if existing_user:
        if existing_user.is_verified:
            return Response({'error': 'User already exists. Please login.'}, status=400)

        email_conflict = User.objects.filter(email=email).exclude(id=existing_user.id).first()
        if email_conflict:
            return Response({'error': 'This email is already used by another account.'}, status=400)

        otp = generate_otp()
        existing_user.email = email
        existing_user.phone = phone
        existing_user.name = serializer.validated_data.get('name', existing_user.name)
        existing_user.email_otp = otp
        existing_user.otp_created_at = now()
        existing_user.save()

        send_otp_email(email, otp)
        return Response({'message': 'OTP resent to existing user', 'user_id': existing_user.id}, status=200)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists.'}, status=400)

    otp = generate_otp()
    user = serializer.save()
    user.email_otp = otp
    user.otp_created_at = now()
    user.is_verified = False
    user.save()

    send_otp_email(email, otp)
    return Response({'message': 'OTP sent to email', 'user_id': user.id}, status=201)


@api_view(['POST'])
def verify_otp(request):
    user_id = request.data.get('user_id')
    otp = request.data.get('otp')

    try:
        user = User.objects.get(id=user_id)
        if user.email_otp == otp:
            user.is_verified = True
            user.email_otp = None
            user.save()
            return Response({'message': 'Email verified successfully'}, status=200)
        return Response({'error': 'Invalid OTP'}, status=400)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(['POST'])
def resend_otp(request):
    user_id = request.data.get('user_id')
    try:
        user = User.objects.get(id=user_id)
        otp = generate_otp()
        user.email_otp = otp
        user.otp_created_at = now()
        user.save()
        send_otp_email(user.email, otp)
        return Response({'message': 'OTP resent'}, status=200)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email)
            if user.password != password:
                return Response({'error': 'Invalid password'}, status=401)
            if not user.is_verified:
                return Response({'error': 'Please verify your email first'}, status=403)
            return Response({'message': 'Login successful.', 'user': UserSerializer(user).data})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
    return Response(serializer.errors, status=400)


# -------------------------
# User Profile
# -------------------------

@api_view(['GET'])
def get_user(request, id):
    try:
        user = User.objects.get(id=id)
        return Response(UserSerializer(user).data)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)


@api_view(['PUT'])
def update_user(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated.', 'user': serializer.data})
        return Response(serializer.errors, status=400)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)


# -------------------------
# Admin User List (from rajesh-branch)
# -------------------------
@api_view(['GET'])
def get_admin_users(request):
    # Exclude admins or just fetch all
    users = User.objects.all().order_by('-id')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# -------------------------
# Services (Admin & Client)
# -------------------------

@api_view(['GET'])
def get_services(request):
    services = Service.objects.all().order_by('-id')
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_service_detail(request, pk):
    try:
        service = Service.objects.get(pk=pk)
        return Response(ServiceSerializer(service).data)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=404)


@api_view(['POST'])
def create_service(request):
    serializer = ServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Service created", "data": serializer.data}, status=201)
    return Response({"error": serializer.errors}, status=400)


@api_view(['PUT'])
def update_service(request, id):
    try:
        service = Service.objects.get(id=id)
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Service updated", "data": serializer.data})
        return Response({"error": serializer.errors}, status=400)
    except Service.DoesNotExist:
        return Response({"error": "Service not found"}, status=404)


@api_view(['DELETE'])
def delete_service(request, id):
    try:
        service = Service.objects.get(id=id)
        service.delete()
        return Response({"message": "Service deleted"})
    except Service.DoesNotExist:
        return Response({"error": "Service not found"}, status=404)


# -------------------------
# Providers (Admin & Client)
# -------------------------

@api_view(['GET'])
def get_providers(request):
    providers = Provider.objects.all().order_by('-id')
    serializer = ProviderSerializer(providers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_admin_providers(request):
    providers = Provider.objects.all().order_by('-id')
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
        return Response(ProviderSerializer(provider).data)
    except Provider.DoesNotExist:
        return Response({'error': 'Provider not found'}, status=404)


@api_view(['POST'])
def create_provider(request):
    serializer = ProviderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Provider created", "data": serializer.data}, status=201)
    return Response({"error": serializer.errors}, status=400)


@api_view(['PUT'])
def update_provider(request, id):
    try:
        provider = Provider.objects.get(id=id)
        serializer = ProviderSerializer(provider, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Provider updated", "data": serializer.data})
        return Response({"error": serializer.errors}, status=400)
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found"}, status=404)


@api_view(['DELETE'])
def delete_provider(request, id):
    try:
        provider = Provider.objects.get(id=id)
        provider.delete()
        return Response({"message": "Provider deleted"})
    except Provider.DoesNotExist:
        return Response({"error": "Provider not found"}, status=404)


# -------------------------
# Provider Status & Actions (monika-new)
# -------------------------

@api_view(['PATCH'])
def save_wa_sent(request, provider_id):
    user_id = request.data.get('user_id')
    status_obj, created = ProviderStatus.objects.get_or_create(provider_id=provider_id, user_id=user_id)
    status_obj.wa_sent = True
    status_obj.save()
    return Response({'message': 'WhatsApp status updated'})


@api_view(['PATCH'])
def save_provider_response(request, provider_id):
    user_id = request.data.get('user_id')
    availability = request.data.get('availability')
    status_obj, created = ProviderStatus.objects.get_or_create(provider_id=provider_id, user_id=user_id)
    status_obj.availability = availability
    status_obj.save()
    return Response({'message': 'Response saved'})


@api_view(['PATCH'])
def confirm_provider(request, provider_id):
    user_id = request.data.get('user_id')
    status_obj, created = ProviderStatus.objects.get_or_create(provider_id=provider_id, user_id=user_id)
    status_obj.confirmed = True
    status_obj.save()
    return Response({'message': 'Provider confirmed'})


@api_view(['GET'])
def get_provider_status(request):
    user_id = request.query_params.get('user_id')
    statuses = ProviderStatus.objects.filter(user_id=user_id)
    serializer = ProviderStatusSerializer(statuses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def respond_via_link(request):
    provider_id = request.query_params.get('provider')
    status_val = request.query_params.get('status')
    user_id = request.query_params.get('user')

    if not provider_id or not status_val or not user_id:
        return Response({'error': 'Missing data'}, status=400)

    try:
        status_obj = ProviderStatus.objects.get(provider_id=provider_id, user_id=user_id)
        status_obj.availability = status_val
        status_obj.save()
        return HttpResponse("<h2>✅ Response recorded. Thank you!</h2>")
    except ProviderStatus.DoesNotExist:
        return Response({'error': 'No record found'}, status=404)


# -------------------------
# Addresses
# -------------------------

@api_view(['GET'])
def get_all_addresses(request):
    addresses = Address.objects.all()
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_address(request):
    serializer = AddressSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_user_addresses(request, user_id):
    addresses = Address.objects.filter(user_id=user_id)
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def address_detail(request, pk):
    try:
        address = Address.objects.get(pk=pk)
    except Address.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        return Response(AddressSerializer(address).data)
    elif request.method == 'PUT':
        serializer = AddressSerializer(address, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        address.delete()
        return Response(status=204)


# -------------------------
# Bookings (from monika-new branch)
# -------------------------

@api_view(['POST'])
def create_booking(request):
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# -------------------------
# Reviews (NEW from rajesh-branch)
# -------------------------

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def submit_review(request):
    # FormData sends all values as strings, but the serializer expects
    # integer pk values for ForeignKey fields (user, provider).
    # Create a mutable copy and convert them to integers.
    data = request.data.copy()
    if 'user' in data:
        try:
            data['user'] = int(data['user'])
        except (ValueError, TypeError):
            return Response({"error": {"user": ["A valid integer is required."]}}, status=400)
    if 'provider' in data:
        try:
            data['provider'] = int(data['provider'])
        except (ValueError, TypeError):
            return Response({"error": {"provider": ["A valid integer is required."]}}, status=400)

    serializer = ReviewSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Review submitted successfully!", "data": serializer.data}, status=201)
    return Response({"error": serializer.errors}, status=400)


@api_view(['GET'])
def get_all_reviews(request):
    reviews = Review.objects.all().order_by('-created_at')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_admin_reviews(request):
    reviews = Review.objects.all().order_by('-created_at')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def update_review_status(request, id):
    try:
        review = Review.objects.get(id=id)
        new_status = request.data.get('status', review.status)
        review.status = new_status
        review.save()

        # Update average rating of provider if approved
        if new_status == 'approved':
            provider = review.provider
            approved_reviews = Review.objects.filter(provider=provider, status='approved')
            total_reviews = approved_reviews.count()
            if total_reviews > 0:
                avg_rating = sum([r.rating for r in approved_reviews]) / total_reviews
                provider.rating = round(avg_rating, 1)
                provider.reviews = total_reviews
                provider.save()

        return Response({"message": "Review updated status successfully"})
    except Review.DoesNotExist:
        return Response({"error": "Review not found"}, status=404)


# -------------------------
# Admin Dashboard Stats (NEW from rajesh-branch)
# -------------------------

@api_view(['GET'])
def admin_dashboard_stats(request):
    total_users = User.objects.count()
    total_providers = Provider.objects.count()
    active_providers = Provider.objects.filter(status="active").count()
    
    # Try using ServiceRequest or Booking
    total_requests = ServiceRequest.objects.count()
    completed_requests = ServiceRequest.objects.filter(status="completed").count()
    
    total_reviews = Review.objects.count()

    data = {
        "total_users": total_users,
        "total_providers": total_providers,
        "active_providers": active_providers,
        "total_requests": total_requests,
        "completed_requests": completed_requests,
        "total_reviews": total_reviews
    }
    return Response(data)


# -------------------------
# Service Requests / Bookings (rajesh-branch style)
# -------------------------

@api_view(['GET'])
def get_service_requests(request):
    requests = ServiceRequest.objects.all().order_by('-id')
    serializer = ServiceRequestSerializer(requests, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def update_service_status(request, id):
    try:
        service_req = ServiceRequest.objects.get(id=id)
        service_req.status = request.data.get('status', service_req.status)
        service_req.save()
        return Response({"message": "Status updated successfully", "status": service_req.status})
    except ServiceRequest.DoesNotExist:
        return Response({"error": "Request not found"}, status=404)
# -------------------------
# User Specific Data (Bookings & Reviews)
# -------------------------

@api_view(['GET'])
def get_user_bookings(request, user_id):
    # Fetch from both Booking and ServiceRequest to be safe, 
    # but primarily ServiceRequest seems to be the newer model.
    # We will try to harmonize the fields for the frontend.
    
    bookings = Booking.objects.filter(user_id=user_id).order_by('-created_at')
    service_requests = ServiceRequest.objects.filter(user_id=user_id).order_by('-created_at')
    
    combined_bookings = []
    
    # Process Bookings
    for b in bookings:
        combined_bookings.append({
            'id': b.id,
            'type': 'booking',
            'service': b.service,
            'address': b.address,
            'description': b.description,
            'providers': b.providers,
            'status': b.status,
            'date': b.created_at.strftime('%Y-%m-%d'),
            'time': b.created_at.strftime('%H:%M %p'),
            'created_at': b.created_at
        })
        
    # Process Service Requests
    for sr in service_requests:
        combined_bookings.append({
            'id': sr.id,
            'type': 'service_request',
            'service': sr.service_name,
            'provider': sr.provider.name if sr.provider else "N/A",
            'providers': [sr.provider.name] if sr.provider else [],
            'date': str(sr.date),
            'time': sr.time,
            'status': sr.status,
            'description': sr.description,
            'address': "Address not specified", # ServiceRequest lacks address field
            'created_at': sr.created_at
        })
        
    # Sort by created_at
    combined_bookings.sort(key=lambda x: x['created_at'], reverse=True)
    
    return Response(combined_bookings)


@api_view(['GET'])
def get_user_reviews(request, user_id):
    reviews = Review.objects.filter(user_id=user_id).order_by('-created_at')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_provider_reviews(request, provider_id):
    reviews = Review.objects.filter(provider_id=provider_id, status='approved').order_by('-created_at')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)
