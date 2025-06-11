from rest_framework import serializers
from .models import DoctorProfile, Diagnosis
import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = ['id', 'user_id', 'specialty', 'clinic', 'schedule', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_user_id(self, value):
        return value

class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ['id', 'patient_id', 'doctor', 'diagnosis_date', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_user_id(self, value):
        return value