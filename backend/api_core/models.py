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