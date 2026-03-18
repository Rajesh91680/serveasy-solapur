"""
===========================================================
SERIALIZER: Dashboard Stats

AdminDashboard.js page 
===========================================================
"""

from rest_framework import serializers

class DashboardStatsSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    total_providers = serializers.IntegerField()
    total_requests = serializers.IntegerField()
    total_reviews = serializers.IntegerField()