from rest_framework import serializers
from .models import User, Provider, Service, Review, ServiceRequest, Address, ProviderStatus, Booking

# -------------------------
# User & Auth Serializers
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
# Service & Provider Serializers
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
# Address & Status Serializers
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
# Booking Serializer (Updated for Admin)
# -------------------------
class BookingSerializer(serializers.ModelSerializer):
    # 'customer' instead of 'user_name' because your Admin UI is looking for this key
    customer = serializers.ReadOnlyField(source='user.name') 
    service_name = serializers.ReadOnlyField(source='service')

    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'customer', 'service_name', 'service', 
            'address', 'description', 'providers', 'status', 'created_at'
        ]
# -------------------------
# Review Serializer
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
# Service Request Serializer
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