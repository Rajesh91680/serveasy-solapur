from rest_framework import serializers
from .models import Address, Service, Provider, User


# -------------------------
# User Serializers
# -------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'name', 'phone', 'email', 'title',
            'address_line', 'city', 'area', 'pin_code', 'created_at'
        ]


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'name', 'phone', 'email', 'password',
            'title', 'address_line', 'city', 'area', 'pin_code'
        ]

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
        fields = '__all__'


class ProviderSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)

    class Meta:
        model = Provider
        fields = '__all__'


# -------------------------
# Address Serializer (UPDATED ✅)
# -------------------------
class AddressSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Address
        fields = [
            'id',
            'user',          # ✅ ForeignKey now
            'user_name',     # ✅ extra helpful field
            'address_type',
            'address_line1',
            'address_line2',
            'area',
            'city',
            'pincode',
            'is_default',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']