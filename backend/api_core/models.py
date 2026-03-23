from django.db import models


class Address(models.Model):
    ADDRESS_TYPE_CHOICES = [
        ('home', 'Home'),
        ('office', 'Office'),
        ('other', 'Other'),
    ]

    user_id = models.CharField(max_length=100)  # matches frontend user id (e.g. 'u1')
    address_type = models.CharField(max_length=10, choices=ADDRESS_TYPE_CHOICES, default='home')
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, default='')
    area = models.CharField(max_length=100, blank=True, default='')
    city = models.CharField(max_length=100, default='Solapur')
    pincode = models.CharField(max_length=10)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.address_type.capitalize()} - {self.address_line1}, {self.city}"

    class Meta:
        db_table = 'address'
        ordering = ['-created_at']
class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)  # Icon name for frontend
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'service'


class Provider(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='providers')
    name = models.CharField(max_length=100)
    rating = models.FloatField(default=0.0)
    experience = models.IntegerField(default=0)  # In years
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    avatar_url = models.URLField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service.name}"

    class Meta:
        db_table = 'provider'
