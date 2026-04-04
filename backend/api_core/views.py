# import json
# from django.http import JsonResponse, HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_http_methods
# from .models import Provider, ServiceRequest


# # ─────────────────────────────────────────────────────────────────
# # GET /
# # Simple homepage — required because serveasy_project/urls.py
# # imports this. Without it Django throws ImportError on startup.
# # ─────────────────────────────────────────────────────────────────
# def home(request):
#     return HttpResponse("ServeEasy API is running ✅")


# # ─────────────────────────────────────────────────────────────────
# # GET /api/providers/
# # Returns all active providers as JSON for the React frontend
# # ─────────────────────────────────────────────────────────────────
# @csrf_exempt
# @require_http_methods(["GET"])
# def get_providers(request):
#     providers = Provider.objects.filter(is_available=True).values(
#         "id", "name", "service", "phone", "rating", "is_available"
#     )
#     return JsonResponse(list(providers), safe=False)


# # ─────────────────────────────────────────────────────────────────
# # POST /api/service-requests/
# #
# # ✅ THE KEY FIX:
# #   Frontend sends:  { provider_names: ["Ravi Kumar", "Suresh Patil"], service, date }
# #   This view reads: data.get("provider_names", [])  ← array
# #   Then loops and creates ONE row per provider name in "service-requests" table
# # ─────────────────────────────────────────────────────────────────
# @csrf_exempt
# @require_http_methods(["POST"])
# def book_service(request):
#     try:
#         data = json.loads(request.body)
#         print("📥 Received payload:", data)

#         provider_names = data.get("provider_names", [])   # ✅ array from frontend
#         service        = data.get("service", "").strip()
#         date           = data.get("date",    "").strip()

#         # ── Validate ──────────────────────────────────────────────
#         if not service:
#             return JsonResponse({"error": "service is required"}, status=400)
#         if not date:
#             return JsonResponse({"error": "date is required"}, status=400)
#         if not provider_names or not isinstance(provider_names, list):
#             return JsonResponse({"error": "provider_names must be a non-empty array"}, status=400)

#         # ── Save one DB row per provider name ─────────────────────
#         saved   = []
#         skipped = []

#         for name in provider_names:
#             name = name.strip() if name else ""
#             if not name:
#                 skipped.append("(empty)")
#                 continue

#             row = ServiceRequest.objects.create(
#                 service=service,
#                 date=date,
#                 provider_name=name,
#             )
#             print(f"  ✅ Saved id={row.id}: {service} | {date} | {name}")
#             saved.append({"id": row.id, "provider_name": name})

#         if not saved:
#             print("⚠️  No rows saved — all names were empty")
#             return JsonResponse({"error": "No valid provider names provided"}, status=400)

#         return JsonResponse({
#             "success":  True,
#             "id":       saved[0]["id"],   # first row id — used as bookingId in ProviderList.js
#             "bookings": saved,
#             "skipped":  skipped,
#         }, status=201)

#     except json.JSONDecodeError:
#         return JsonResponse({"error": "Invalid JSON body"}, status=400)
#     except Exception as e:
#         print("❌ Error:", str(e))
#         return JsonResponse({"error": str(e)}, status=500)


# # ─────────────────────────────────────────────────────────────────
# # GET /api/bookings/
# # Debug — see all saved rows in service-requests table
# # Open: http://localhost:8002/api/bookings/
# # ─────────────────────────────────────────────────────────────────
# @csrf_exempt
# @require_http_methods(["GET"])
# def get_bookings(request):
#     bookings = ServiceRequest.objects.all().values(
#         "id", "service", "date", "provider_name"
#     ).order_by("-id")
#     return JsonResponse(list(bookings), safe=False)




import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ServiceRequest


def home(request):
    return JsonResponse({"message": "ServEasy API is running ✅"})


@csrf_exempt
def service_requests(request):
    """
    GET  /api/service-requests/  → list all bookings
    POST /api/service-requests/  → create booking(s)

    Accepts TWO payload formats so nothing breaks:
      Format A (correct): { provider_names: ["Ravi", "Suresh"], service, date }
      Format B (legacy):  { user, provider_id, service, address, date, status }
                          → ignored silently (returns 200 so frontend doesn't crash)
    """

    # ── GET ──────────────────────────────────────────────────────────────────
    if request.method == "GET":
        bookings = list(
            ServiceRequest.objects.all()
            .order_by("-id")
            .values("id", "service", "date", "provider_name")
        )
        return JsonResponse(bookings, safe=False)

    # ── POST ─────────────────────────────────────────────────────────────────
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            print("📥 Received payload:", data)

            # ── Detect legacy format (has provider_id key) ────────────────
            # These come from BookingRequest.js / Booking.js — ignore them.
            if "provider_id" in data:
                print("⚠️  Legacy payload with provider_id — skipping (not saved).")
                return JsonResponse({"status": "ignored", "reason": "legacy format"}, status=200)

            # ── Correct format: provider_names array ──────────────────────
            provider_names = data.get("provider_names", [])
            service        = (data.get("service") or "").strip()
            date           = (data.get("date")    or "").strip()

            if not service:
                return JsonResponse({"error": "service is required"}, status=400)
            if not date:
                return JsonResponse({"error": "date is required"}, status=400)
            if not provider_names:
                return JsonResponse({"error": "provider_names list is required"}, status=400)

            saved = []
            for name in provider_names:
                name = name.strip()
                if not name:
                    continue
                obj = ServiceRequest.objects.create(
                    service=service,
                    date=date,
                    provider_name=name,
                )
                print(f"  ✅ Saved id={obj.id}: {service} | {date} | {name}")
                saved.append({
                    "id":            obj.id,
                    "service":       obj.service,
                    "date":          str(obj.date),
                    "provider_name": obj.provider_name,
                })

            return JsonResponse({"status": "saved", "bookings": saved}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            print("❌ Error:", e)
            return JsonResponse({"error": str(e)}, status=500)

    # ── OTHER METHODS ─────────────────────────────────────────────────────────
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)