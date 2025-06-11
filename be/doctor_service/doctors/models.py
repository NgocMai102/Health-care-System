# Định nghĩa các model cho doctor_service
from django.db import models

class DoctorProfile(models.Model):
    user_id = models.IntegerField(unique=True)
    specialty = models.CharField(max_length=100)
    clinic = models.CharField(max_length=200)
    schedule = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Doctor {self.user_id} - {self.specialty}"

class Diagnosis(models.Model):
    patient_id = models.IntegerField()
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.CASCADE, related_name='diagnoses')
    diagnosis_date = models.DateTimeField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Diagnosis for Patient {self.patient_id} by Doctor {self.doctor.user_id}"