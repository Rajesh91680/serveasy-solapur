from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .models import ServiceRequest, Review
from .serializers import ServiceRequestSerializer, ReviewSerializer


# ==========================
# SERVICE REQUEST
# ==========================

class ServiceRequestListCreate(APIView):

    def get(self, request):
        qs = ServiceRequest.objects.all()   # ✅ removed created_at
        return Response(ServiceRequestSerializer(qs, many=True).data)

    def post(self, request):
        print("DATA:", request.data)

        serializer = ServiceRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        print("ERRORS:", serializer.errors)
        return Response(serializer.errors, status=400)


class ServiceRequestByUser(APIView):

    def get(self, request, user_id):
        # ❌ user field नहीं है → इसलिए empty return
        return Response([])


class ServiceRequestByProvider(APIView):

    def get(self, request, provider_id):
        qs = ServiceRequest.objects.filter(provider_id=provider_id)
        return Response(ServiceRequestSerializer(qs, many=True).data)


class ServiceRequestDetail(APIView):

    def get(self, request, pk):
        try:
            obj = ServiceRequest.objects.get(pk=pk)
        except ServiceRequest.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        return Response(ServiceRequestSerializer(obj).data)

    def put(self, request, pk):
        try:
            obj = ServiceRequest.objects.get(pk=pk)
        except ServiceRequest.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        serializer = ServiceRequestSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


# ==========================
# REVIEWS (FIXED)
# ==========================

class ReviewListCreate(APIView):

    parser_classes = [MultiPartParser, FormParser]   # ✅ IMPORTANT

    def get(self, request):
        qs = Review.objects.all()
        return Response(ReviewSerializer(qs, many=True).data)

    def post(self, request):
        print("DATA:", request.data)
        print("FILES:", request.FILES)

        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        print("ERRORS:", serializer.errors)
        return Response(serializer.errors, status=400)


class ReviewByProvider(APIView):

    def get(self, request, provider_id):
        qs = Review.objects.filter(provider_id=provider_id)
        return Response(ReviewSerializer(qs, many=True).data)


class ReviewDetail(APIView):

    def get(self, request, pk):
        try:
            obj = Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        return Response(ReviewSerializer(obj).data)