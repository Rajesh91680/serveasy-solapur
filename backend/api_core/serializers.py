# # from rest_framework import serializers
# # from .models import ServiceRequest


# # # ============================================================
# # # SERVICE REQUEST SERIALIZER
# # # ============================================================
# # class ServiceRequestSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = ServiceRequest
# #         fields = '__all__'


# from rest_framework import serializers
# from .models import ServiceRequest

# class ServiceRequestSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ServiceRequest
#         fields = ['id', 'service', 'date', 'provider_name', 'provider_id',]


from rest_framework import serializers
from .models import ServiceRequest

class ServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequest
        fields = "__all__"