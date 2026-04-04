# from django.db import models

# # ─────────────────────────────────────────────────────────────────
# # Provider — existing table, do not rename
# # ─────────────────────────────────────────────────────────────────
# class Provider(models.Model):
#     name         = models.CharField(max_length=100)
#     service      = models.CharField(max_length=100)
#     phone        = models.CharField(max_length=20, blank=True, null=True)
#     rating       = models.FloatField(default=0.0)
#     is_available = models.BooleanField(default=True)

#     def __str__(self):
#         return f"{self.name} — {self.service}"

#     class Meta:
#         db_table = "api_core_provider"


# # ─────────────────────────────────────────────────────────────────
# # ServiceRequest — one row per provider booked
# #
# # ⚠️  NO ForeignKey to Provider.
# #     Your DB table "service-requests" has only 3 real columns:
# #       service, date, provider_name
# #     A ForeignKey adds provider_id which does NOT exist → causes error.
# # ─────────────────────────────────────────────────────────────────
# class ServiceRequest(models.Model):
#     service       = models.CharField(max_length=100)   # "AC Repair"
#     date          = models.DateField()                 # 2026-04-03
#     provider_name = models.CharField(max_length=100)   # "Ravi Kumar"

#     def __str__(self):
#         return f"{self.service} | {self.provider_name} | {self.date}"

#     class Meta:
#         db_table = "service-requests"   # exact Postgres table name



from django.db import models


class ServiceRequest(models.Model):
    service       = models.CharField(max_length=200)
    date          = models.DateField()
    provider_name = models.CharField(max_length=200)

    class Meta:
        db_table  = "service-requests"   # keep your existing Postgres table
        ordering  = ["-id"]

    def __str__(self):
        return f"{self.service} | {self.date} | {self.provider_name}"