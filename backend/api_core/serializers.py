# serializers.py
# This file converts data between Python objects and JSON format.
# It acts as a bridge between the database and the API response.
# Member 1 - Authentication & Profile

from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    # Used to send user data in API responses (GET, Login, Update)
    class Meta:
        model  = User
        fields = ['id', 'name', 'phone', 'email', 'title',
                  'address_line', 'city', 'area', 'pin_code', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    # Used to validate and save signup form data
    class Meta:
        model  = User
        fields = ['name', 'phone', 'email', 'password',
                  'title', 'address_line', 'city', 'area', 'pin_code']

    def create(self, validated_data):
        return User.objects.create(**validated_data)


class LoginSerializer(serializers.Serializer):
    # Used to validate login form data (email and password only)
    email    = serializers.EmailField()
    password = serializers.CharField()