# # models.py
# from django.db import models


# class ServiceRequest(models.Model):
#     STATUS_CHOICES = [
#         ("pending", "Pending"),
#         ("accepted", "Accepted"),
#         ("completed", "Completed"),
#         ("cancelled", "Cancelled"),
#     ]

#     user = models.IntegerField()          # FK to auth user id
#     provider_id = models.IntegerField()   # FK to provider id
#     service_name = models.CharField(max_length=255)
#     address = models.TextField(blank=True, null=True)
#     date = models.CharField(max_length=50, blank=True, null=True)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         db_table = "service-requests"   # exact table name as required

#     def __str__(self):
#         return f"ServiceRequest #{self.id} - {self.service_name}"


# class Review(models.Model):
#     user = models.IntegerField()
#     provider_id = models.IntegerField()
#     rating = models.IntegerField()        # 1–5
#     review = models.TextField(blank=True, null=True)
#     photo = models.ImageField(upload_to="review_photos/", blank=True, null=True)

#     class Meta:
#         db_table = "review"             # exact table name as required

#     def __str__(self):
#         return f"Review #{self.id} - Provider {self.provider_id} - {self.rating}★"



# from django.db import models

# class ServiceRequest(models.Model):
#     service = models.CharField(max_length=100)
#     date = models.DateField()
#     provider_id = models.IntegerField()

#     class Meta:
#         db_table = '"service-requests"'


# class Review(models.Model):
#     user = models.IntegerField(default=1)
#     provider_id = models.IntegerField()
#     rating = models.IntegerField()
#     review = models.TextField()
#     photo = models.ImageField(upload_to="reviews/", null=True, blank=True)

#     class Meta:
#         db_table = "review"


from django.db import models


class ServiceRequest(models.Model):
    service = models.CharField(max_length=100)
    date = models.DateField()
    provider_id = models.IntegerField()

    class Meta:
        db_table = '"service-requests"'


class Review(models.Model):
    user = models.IntegerField(default=1)
    provider_id = models.IntegerField()
    rating = models.IntegerField()
    review = models.TextField()
    photo = models.ImageField(upload_to="reviews/", null=True, blank=True)

    class Meta:
        db_table = "review"
