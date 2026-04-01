# serializers.py
# This file converts data between Python objects and JSON format.
# It acts as a bridge between the database and the API response.
# Member 1 - Authentication & Profile


from rest_framework import serializers
# 1. IMPORT ALL MODELS AT THE TOP
from .models import User, Provider, Service, Review, ServiceRequest

# ================= USER & AUTH SERIALIZERS =================
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['id', 'name', 'phone', 'email', 'role', 'title',
                  'address_line', 'city', 'area', 'pin_code', 'created_at']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['name', 'phone', 'email', 'password',
                  'title', 'address_line', 'city', 'area', 'pin_code']

    def create(self, validated_data):
        return User.objects.create(**validated_data)

class LoginSerializer(serializers.Serializer):
    email    = serializers.EmailField()
    password = serializers.CharField()

# ================= SERVICE & PROVIDER SERIALIZERS =================
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = "__all__"

# ================= REVIEWS SERIALIZER =================
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    provider_name = serializers.ReadOnlyField(source='provider.name')

    class Meta:
        model = Review
        fields = [
            'id', 'user', 'user_name', 'provider', 'provider_name', 
            'rating', 'review_text', 'work_photo', 'created_at'
        ]

# ================= SERVICE REQUEST SERIALIZER =================
class ServiceRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    provider_name = serializers.ReadOnlyField(source='provider.name')

    class Meta:
        model = ServiceRequest
        fields = [
            'id', 'user', 'user_name', 'provider', 'provider_name', 
            'service_name', 'description', 'date', 'time', 'status', 'created_at'
        ]