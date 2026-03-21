from django.contrib import admin
from .models import ServiceRequest, Review


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display  = ['id', 'user_id', 'provider_id', 'service_id', 'status', 'created_at']
    list_filter   = ['status']
    search_fields = ['user_id', 'provider_id', 'address']
    ordering      = ['-created_at']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display  = ['id', 'user_id', 'provider_id', 'rating', 'comment', 'created_at']
    list_filter   = ['rating']
    search_fields = ['user_id', 'provider_id']
    ordering      = ['-created_at']