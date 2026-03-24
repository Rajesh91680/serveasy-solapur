from django.db import models

class ServiceRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]
    user_id = models.IntegerField()
    provider_id = models.IntegerField()
    service_id = models.IntegerField()
    address = models.TextField()
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    scheduled_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Review(models.Model):
    user_id = models.IntegerField()
    provider_id = models.IntegerField()
    service_request = models.ForeignKey(ServiceRequest, null=True, blank=True, on_delete=models.SET_NULL)
    rating = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
