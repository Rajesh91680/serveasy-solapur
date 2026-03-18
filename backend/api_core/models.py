from django.db import models

class User(models.Model):
    name       = models.CharField(max_length=100)
    email      = models.EmailField(unique=True)
    phone      = models.CharField(max_length=15, unique=True)
    password   = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.name

class Address(models.Model):
    user         = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    title        = models.CharField(max_length=50)
    address_line = models.TextField()
    city         = models.CharField(max_length=100)
    area         = models.CharField(max_length=100)
    pin_code     = models.CharField(max_length=10)
    is_default   = models.BooleanField(default=False)

    class Meta:
        db_table = 'addresses'

    def __str__(self):
        return f"{self.title} - {self.user.name}"