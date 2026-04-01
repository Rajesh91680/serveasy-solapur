from rest_framework import serializers
from .models import Address, Service, Provider, User, ProviderStatus, Booking
from .models import User, Service, Provider




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


# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = [
#             'name', 'phone', 'email', 'password',
#             'title', 'address_line', 'city', 'area', 'pin_code'
#         ]
class RegisterSerializer(serializers.ModelSerializer):

    phone = serializers.CharField()
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = [
            'name', 'phone', 'email', 'password',
            'title', 'address_line', 'city', 'area', 'pin_code'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')

        user = User.objects.create(**validated_data)
        user.password = password
        user.save()

        return user

    def create(self, validated_data):
        # Remove password temporarily
        password = validated_data.pop('password')

        user = User.objects.create(**validated_data)
        user.password = password  # (you can hash later)
        user.save()

        return user
        
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


# -------------------------
# NEW SERIALIZERS (✅)
# -------------------------
class ProviderStatusSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(source='provider.name', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = ProviderStatus
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
    # Used to validate login form data (email and password only)
    email    = serializers.EmailField()
    password = serializers.CharField()

# Admin & Service Management

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = "__all__"

