from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Prescription, Medicine
from .serializers import PrescriptionSerializer, MedicineSerializer
import logging

logger = logging.getLogger(__name__)

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer

    def update(self, request, *args, **kwargs):
        """
        Cập nhật trạng thái đơn thuốc (pending, dispensed, cancelled).
        """
        instance = self.get_object()
        status = request.data.get('status')
        if status not in ['pending', 'dispensed', 'cancelled']:
            logger.error(f"Invalid status {status} for prescription {instance.id}")
            return Response({"detail": "Invalid status"}, status=400)
        instance.status = status
        instance.save()
        serializer = self.get_serializer(instance)
        logger.debug(f"Updated status of prescription {instance.id} to {status}")
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='by_diagnosisId/(?P<diagnosis_id>\d+)')
    def get_by_diagnosis_id(self, request, diagnosis_id=None):
        """
        Endpoint để lấy danh sách đơn thuốc theo diagnosis_id.
        URL: GET /api/prescriptions/by_diagnosisId/{diagnosis_id}/
        """
        logger.debug(f"Fetching prescriptions for diagnosis_id: {diagnosis_id}")
        prescriptions = Prescription.objects.filter(diagnosis_id=diagnosis_id)
        if not prescriptions.exists():
            logger.debug(f"No prescriptions found for diagnosis_id: {diagnosis_id}")
            return Response({"detail": f"No prescriptions found for diagnosis_id {diagnosis_id}"}, status=404)
        serializer = self.get_serializer(prescriptions, many=True)
        logger.debug(f"Successfully fetched {prescriptions.count()} prescriptions for diagnosis_id: {diagnosis_id}")
        return Response(serializer.data)

class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer