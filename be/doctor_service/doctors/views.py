from rest_framework import viewsets, permissions, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DoctorProfile, Diagnosis
from .serializers import DoctorProfileSerializer, DiagnosisSerializer
from django.shortcuts import get_object_or_404
import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class DoctorProfileViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer

    def get_permissions(self):
        return [permissions.AllowAny()]

    def get_queryset(self):
        return DoctorProfile.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get', 'put', 'patch'], url_path='user/(?P<user_id>\d+)')
    def by_user_id(self, request, user_id=None):
        """
        Endpoint tùy chỉnh để lấy hoặc cập nhật hồ sơ bác sĩ theo user_id.
        URL: GET/PUT/PATCH /api/doctors/user/{user_id}/
        """
        doctor_profile = get_object_or_404(DoctorProfile, user_id=user_id)
        
        if request.method == 'GET':
            serializer = self.get_serializer(doctor_profile)
            return Response(serializer.data)
        
        serializer = self.get_serializer(doctor_profile, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class DiagnosisViewSet(viewsets.ModelViewSet):
    queryset = Diagnosis.objects.all()
    serializer_class = DiagnosisSerializer

    def get_permissions(self):
        return [permissions.AllowAny()]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == 'admin':
            return Diagnosis.objects.all()
        elif user.is_authenticated:
            return Diagnosis.objects.filter(doctor__user_id=user.id)
        else:
            return Diagnosis.objects.all()

    def perform_create(self, serializer):
        doctor_id = self.request.data.get('doctor')
        if not doctor_id:
            raise serializers.ValidationError("Doctor ID is required.")
        doctor = get_object_or_404(DoctorProfile, id=doctor_id)
        serializer.save(doctor=doctor)

    @action(detail=False, methods=['get'], url_path='by_patientId/(?P<patient_id>\d+)')
    def get_by_patient_id(self, request, patient_id=None):
        """
        Endpoint tùy chỉnh để lấy danh sách chuẩn đoán theo patient_id.
        URL: GET /api/diagnoses/by_patientId/{patient_id}/
        """
        logger.debug(f"Fetching diagnoses for patient_id: {patient_id}")
        diagnoses = Diagnosis.objects.filter(patient_id=patient_id)
        if not diagnoses.exists():
            logger.debug(f"No diagnoses found for patient_id: {patient_id}")
            return Response({"detail": f"No diagnoses found for patient_id {patient_id}"}, status=404)
        serializer = self.get_serializer(diagnoses, many=True)
        logger.debug(f"Successfully fetched {diagnoses.count()} diagnoses for patient_id: {patient_id}")
        return Response(serializer.data)

class AppointmentViewSet(viewsets.ViewSet):
    def get_permissions(self):
        return [permissions.AllowAny()]

    @action(detail=False, methods=['get'])
    def list(self, request):
        """
        Endpoint để lấy danh sách lịch hẹn của bác sĩ từ patient_service.
        URL: GET /api/appointments/
        """
        user = request.user
        try:
            response = requests.get(
                f"{settings.PATIENT_SERVICE_URL}appointments/",
                params={'doctor_id': user.id},
                headers={'Authorization': f'Bearer {request.auth}'},
                timeout=5
            )
            if response.status_code != 200:
                logger.error(f"Failed to fetch appointments for doctor_id {user.id}: {response.status_code}")
                return Response({"detail": "Unable to fetch appointments"}, status=response.status_code)
            return Response(response.json())
        except requests.RequestException as e:
            logger.error(f"Error communicating with patient_service: {str(e)}")
            return Response({"detail": "Error communicating with patient_service"}, status=500)

    @action(detail=True, methods=['put'])
    def update_status(self, request, pk=None):
        """
        Endpoint để cập nhật trạng thái lịch hẹn (xác nhận/hủy).
        URL: PUT /api/appointments/{pk}/update-status/
        """
        try:
            response = requests.put(
                f"{settings.PATIENT_SERVICE_URL}appointments/{pk}/",
                json={'status': request.data.get('status')},
                headers={'Authorization': f'Bearer {request.auth}'},
                timeout=5
            )
            if response.status_code != 200:
                logger.error(f"Failed to update appointment {pk}: {response.status_code}")
                return Response({"detail": "Unable to update appointment"}, status=response.status_code)
            return Response(response.json())
        except requests.RequestException as e:
            logger.error(f"Error communicating with patient_service: {str(e)}")
            return Response({"detail": "Error communicating with patient_service"}, status=500)