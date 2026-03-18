from rest_framework import serializers
from .models import User, Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Address
        fields = ['id', 'title', 'address_line', 'city', 'area', 'pin_code', 'is_default']

class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    class Meta:
        model  = User
        fields = ['id', 'name', 'email', 'phone', 'created_at', 'addresses']

class RegisterSerializer(serializers.ModelSerializer):
    title        = serializers.CharField(write_only=True)
    address_line = serializers.CharField(write_only=True)
    city         = serializers.CharField(write_only=True)
    area         = serializers.CharField(write_only=True)
    pin_code     = serializers.CharField(write_only=True)

    class Meta:
        model  = User
        fields = ['name', 'email', 'phone', 'password', 'title', 'address_line', 'city', 'area', 'pin_code']

    def create(self, validated_data):
        address_data = {
            'title':        validated_data.pop('title'),
            'address_line': validated_data.pop('address_line'),
            'city':         validated_data.pop('city'),
            'area':         validated_data.pop('area'),
            'pin_code':     validated_data.pop('pin_code'),
            'is_default':   True,
        }
        user = User.objects.create(**validated_data)
        Address.objects.create(user=user, **address_data)
        return user

class LoginSerializer(serializers.Serializer):
    email    = serializers.EmailField()
    password = serializers.CharField()