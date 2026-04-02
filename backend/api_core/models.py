from django.db import models


# -------------------------
# User Model
# -------------------------
class User(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=20, default='customer') # added from rajesh-branch
    
    # OTP Fields
    email_otp = models.CharField(max_length=6, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    otp_created_at = models.DateTimeField(null=True, blank=True)

    title = models.CharField(max_length=50, blank=True)
    address_line = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    area = models.CharField(max_length=100, blank=True)
    pin_code = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'users'


# -------------------------
# Service Model
# -------------------------
class Service(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)
    image_url = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=20, default="active")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'service'


# -------------------------
# Provider Model
# -------------------------
class Provider(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='providers', null=True, blank=True)
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100, blank=True)
    rating = models.FloatField(default=0.0)
    reviews = models.IntegerField(default=0)
    experience = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    location = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    
    # Images
    avatar_url = models.URLField(blank=True, null=True)
    photo = models.ImageField(upload_to="providers/", null=True, blank=True)
    aadhaar_image = models.ImageField(upload_to="aadhaar/", null=True, blank=True)
    
    is_verified = models.BooleanField(default=False)
    status = models.CharField(max_length=20, default="active")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.service:
            return f"{self.name} - {self.service.name}"
        return self.name

    class Meta:
        db_table = 'provider'


# -------------------------
# Address Model
# -------------------------
class Address(models.Model):
    ADDRESS_TYPES = (
        ('home', 'Home'),
        ('office', 'Office'),
        ('other', 'Other'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    address_type = models.CharField(max_length=10, choices=ADDRESS_TYPES, default='home')
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, default="")
    area = models.CharField(max_length=100, blank=True, default="")
    city = models.CharField(max_length=100, default="Solapur")
    pincode = models.CharField(max_length=10)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'address'
        ordering = ['-created_at']


# -------------------------
# Provider Status Model
# -------------------------
class ProviderStatus(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    wa_sent = models.BooleanField(default=False)
    availability = models.CharField(max_length=10, null=True, blank=True) # 'yes', 'no', or null
    confirmed = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'provider_status'
        unique_together = ('provider', 'user')


# -------------------------
# Booking Model
# -------------------------
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.CharField(max_length=255) # Name of service 
    address = models.TextField()
    description = models.TextField(blank=True, null=True)
    providers = models.JSONField(default=list) # List of provider IDs
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'booking'


# -------------------------
# Review Model (NEW from rajesh-branch)
# -------------------------
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_written')
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='provider_reviews')
    rating = models.IntegerField()
    review_text = models.TextField(blank=True, null=True)
    work_photo = models.ImageField(upload_to="work_photos/", null=True, blank=True)
    status = models.CharField(max_length=20, default='pending') 
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'service_reviews'

    def __str__(self):
        return f"Review by {self.user.name} for {self.provider.name}"


# -------------------------
# Service Request Model (NEW from rajesh-branch)
# -------------------------
class ServiceRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_requests')
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='assigned_requests')
    service_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField()
    time = models.CharField(max_length=50) # e.g., "10:00 AM" or "ASAP"
    status = models.CharField(max_length=20, default="requested")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'service_requests'

    def __str__(self):
        return f"Booking {self.id} - {self.service_name}"
