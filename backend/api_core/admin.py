from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User, Service, Provider, Booking, ServiceRequest, ProviderStatus

admin.site.register(User)
admin.site.register(Service)
admin.site.register(Provider)
admin.site.register(Booking)
admin.site.register(ServiceRequest)
admin.site.register(ProviderStatus)