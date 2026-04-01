from django.db import models


# -------------------------
# User Model
# # -------------------------
# class User(models.Model):
#     name = models.CharField(max_length=100)
#     phone = models.CharField(max_length=15, unique=True)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255)
#     title = models.CharField(max_length=50, blank=True)
#     address_line = models.TextField(blank=True)
#     city = models.CharField(max_length=100, blank=True)
#     area = models.CharField(max_length=100, blank=True)
#     pin_code = models.CharField(max_length=10, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name

#     class Meta:
#         db_table = 'users'

class User(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    # ✅ ADD THESE
    is_verified = models.BooleanField(default=False)
    email_otp = models.CharField(max_length=6, blank=True, null=True)
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
# Address Model (UPDATED ✅)
# -------------------------
class Address(models.Model):
    ADDRESS_TYPE_CHOICES = [
        ('home', 'Home'),
        ('office', 'Office'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
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
        return f"{self.user.name} - {self.address_type.capitalize()} - {self.city}"

    class Meta:
        db_table = 'address'
        ordering = ['-created_at']


# -------------------------
# Service Model
# -------------------------
class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
        return self.name


# ================= SERVICES TABLE =================
# Stores all services managed by admin
class Service(models.Model):
    name        = models.CharField(max_length=100)
    category    = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status      = models.CharField(max_length=20, default="active")

    class Meta:
        db_table = 'admin_services'   

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'service'


# -------------------------
# Provider Model
# -------------------------
class Provider(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='providers')
    name = models.CharField(max_length=100)
    rating = models.FloatField(default=0.0)
    experience = models.IntegerField(default=0)
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


# -------------------------
# Provider Status Model (NEW ✅)
# -------------------------
class ProviderStatus(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    wa_sent = models.BooleanField(default=False)
    availability = models.CharField(max_length=10, null=True, blank=True) # 'yes', 'no', or null
    confirmed = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.provider.name} - {self.availability}"

    class Meta:
        db_table = 'provider_status'
        unique_together = ('provider', 'user')


# -------------------------
# Booking Model (NEW ✅)
# -------------------------
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.CharField(max_length=255)
    address = models.TextField()
    description = models.TextField(blank=True, null=True)
    providers = models.JSONField(default=list)  # Stores selected provider IDs/info
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} - {self.user.name} - {self.service}"

    class Meta:
        db_table = 'booking'

# ================= PROVIDERS TABLE =================
# Stores service providers linked to services
class Provider(models.Model):
    name       = models.CharField(max_length=100)
    specialty  = models.CharField(max_length=100)
    location   = models.CharField(max_length=200)
    experience = models.CharField(max_length=50)
    phone      = models.CharField(max_length=10)

    # Images
    photo         = models.ImageField(upload_to="providers/", null=True, blank=True)
    aadhaar_image = models.ImageField(upload_to="aadhaar/", null=True, blank=True)

    # Ratings
    rating  = models.FloatField(default=4.5)
    reviews = models.IntegerField(default=0)

    status  = models.CharField(max_length=20, default="active")

    class Meta:
        db_table = 'admin_service_providers'   

    def __str__(self):
        return self.name
