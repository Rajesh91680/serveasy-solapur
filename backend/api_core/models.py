# models.py
#This file uses Django ORM written in Python.
# we write a Python class and Django automatically creates the table in PostgreSQL.
# This file defines the database table structure for the ServeEasy project.
# Django reads this file and creates the actual table in PostgreSQL.
# Member 1 - Authentication & Profile

from django.db import models

class User(models.Model):
    name         = models.CharField(max_length=100)
    phone        = models.CharField(max_length=15, unique=True)
    email        = models.EmailField(unique=True)
    password     = models.CharField(max_length=255)
    role = models.CharField(max_length=20, default='customer')
    title        = models.CharField(max_length=50, blank=True)
    address_line = models.TextField(blank=True)
    city         = models.CharField(max_length=100, blank=True)
    area         = models.CharField(max_length=100, blank=True)
    pin_code     = models.CharField(max_length=10, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
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


# ================= PROVIDERS TABLE =================
# Stores service providers linked to services
class Provider(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    specialty = models.CharField(max_length=100) # Ensure this is 'specialty'
    location = models.CharField(max_length=255)  # Ensure this is 'location'
    experience = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)
    reviews = models.IntegerField(default=0)     # Count of reviews
    status = models.CharField(max_length=20, default='active')
    photo = models.ImageField(upload_to='providers/', null=True, blank=True)

    class Meta:
        db_table = 'admin_service_providers'   

    def __str__(self):
        return self.name
    
    # ================= REVIEWS TABLE =================
# Member 3 - Ratings & Reviews
# This table stores the feedback given by a User to a Provider.
# It links the User, the Provider, and the actual review data together.
class Review(models.Model):
    # Linking the review to the User who wrote it
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_written')
    
    # Linking the review to the Provider who did the work
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='provider_reviews')
    
    # Rating (1 to 5 stars)
    rating = models.IntegerField()
    
    # Detailed comment from the user
    review_text = models.TextField(blank=True, null=True)
    
    # Photo of the work completed (uploaded by user)
    work_photo = models.ImageField(upload_to="work_photos/", null=True, blank=True)
    
    # Date and time when the review was submitted
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'service_reviews'

    def __str__(self):
        return f"Review by {self.user.name} for {self.provider.name}"
    
    status = models.CharField(max_length=20, default='pending') 
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review {self.id} - {self.rating} Stars"
    

    # ================= SERVICE REQUESTS (BOOKINGS) =================
# Member 3 - Admin Dashboard & Monitoring
# This table stores every service booking made by users.
class ServiceRequest(models.Model):
    # Linking to the User who booked
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_requests')
    
    # Linking to the Provider assigned
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='assigned_requests')
    
    # The specific service (e.g., AC Repair)
    service_name = models.CharField(max_length=100)
    
    description = models.TextField(blank=True)
    date = models.DateField()
    time = models.CharField(max_length=50) # e.g., "10:00 AM" or "ASAP"
    
    # Status: requested, confirmed, completed, cancelled
    status = models.CharField(max_length=20, default="requested")
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'service_requests'

    def __str__(self):
        return f"Booking {self.id} - {self.service_name}"