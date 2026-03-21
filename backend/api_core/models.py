from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


# ══════════════════════════════════════════════
#  USER MODEL  (required by settings.py)
# ══════════════════════════════════════════════

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('user',     'User'),
        ('provider', 'Provider'),
        ('admin',    'Admin'),
    ]
    name       = models.CharField(max_length=100)
    email      = models.EmailField(unique=True)
    phone      = models.CharField(max_length=15, blank=True, default='')
    role       = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    is_active  = models.BooleanField(default=True)
    is_staff   = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['name']

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f"{self.name} ({self.email})"


# ══════════════════════════════════════════════
#  SERVICE REQUEST MODEL  (Member 3 - Booking)
# ══════════════════════════════════════════════

class ServiceRequest(models.Model):
    STATUS_CHOICES = [
        ('pending',   'Pending'),
        ('accepted',  'Accepted'),
        ('rejected',  'Rejected'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    user_id      = models.IntegerField()
    provider_id  = models.IntegerField()
    service_id   = models.IntegerField()
    address      = models.TextField()
    description  = models.TextField(blank=True, default='')
    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    scheduled_at = models.DateTimeField(null=True, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'service_requests'
        ordering = ['-created_at']

    def __str__(self):
        return f"Request #{self.id} | User {self.user_id} | Provider {self.provider_id} [{self.status}]"


# ══════════════════════════════════════════════
#  REVIEW MODEL  (Member 3 - Reviews)
# ══════════════════════════════════════════════

class Review(models.Model):
    service_request = models.OneToOneField(
        ServiceRequest,
        on_delete=models.CASCADE,
        related_name='review',
        null=True,
        blank=True
    )
    user_id     = models.IntegerField()
    provider_id = models.IntegerField()
    rating      = models.PositiveSmallIntegerField()
    comment     = models.TextField(blank=True, default='')
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reviews'
        ordering = ['-created_at']

    def __str__(self):
        return f"Review by User {self.user_id} | Provider {self.provider_id} | {self.rating} stars"