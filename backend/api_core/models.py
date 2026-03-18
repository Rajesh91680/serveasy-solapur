from django.db import models

class TempUser(models.Model):
    name = models.CharField(max_length=100)

class TempProvider(models.Model):
    name = models.CharField(max_length=100)

class TempServiceRequest(models.Model):
    status = models.CharField(max_length=50)

class TempReview(models.Model):
    rating = models.IntegerField()