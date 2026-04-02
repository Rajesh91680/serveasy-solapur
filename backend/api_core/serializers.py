from rest_framework import serializers
from .models import User, Provider, Service, Review, ServiceRequest, Address, ProviderStatus, Booking


# -------------------------
# User & Auth
# -------------------------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'name', 'phone', 'email', 'role', 'title',
            'address_line', 'city', 'area', 'pin_code', 'created_at'
        ]

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'name', 'phone', 'email', 'password', 
            'title', 'address_line', 'city', 'area', 'pin_code'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


# -------------------------
# Service & Provider
# -------------------------

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

class ProviderSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)

    class Meta:
        model = Provider
        fields = "__all__"


# -------------------------
# Address & Status
# -------------------------

class AddressSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Address
        fields = '__all__'

class ProviderStatusSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(source='provider.name', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = ProviderStatus
        fields = '__all__'


# -------------------------
# Bookings (from monika-new branch)
# -------------------------

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


# -------------------------
# Reviews (NEW from rajesh-branch)
# -------------------------

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    provider_name = serializers.ReadOnlyField(source='provider.name')

    class Meta:
        model = Review
        fields = [
            'id', 'user', 'user_name', 'provider', 'provider_name', 
            'rating', 'review_text', 'work_photo', 'created_at'
        ]


# -------------------------
# Service Requests (NEW from rajesh-branch)
# -------------------------

class ServiceRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    provider_name = serializers.ReadOnlyField(source='provider.name')

    class Meta:
        model = ServiceRequest
        fields = [
            'id', 'user', 'user_name', 'provider', 'provider_name', 
            'service_name', 'description', 'date', 'time', 'status', 'created_at'
        ]