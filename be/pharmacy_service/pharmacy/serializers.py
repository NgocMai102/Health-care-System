from rest_framework import serializers
from .models import Prescription, Medicine
import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['id', 'patient_id', 'doctor_id', 'diagnosis_id', 'details', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        return data

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'description', 'quantity', 'price', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']