# Cấu hình giao diện Django Admin cho các model
from django.contrib import admin
from .models import DoctorProfile, Diagnosis

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'specialty', 'clinic']  
    search_fields = ['user_id', 'specialty']  

@admin.register(Diagnosis)
class DiagnosisAdmin(admin.ModelAdmin):
    list_display = ['patient_id', 'doctor', 'diagnosis_date']  
    search_fields = ['patient_id']  