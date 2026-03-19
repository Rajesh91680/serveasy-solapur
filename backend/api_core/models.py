# models.py
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