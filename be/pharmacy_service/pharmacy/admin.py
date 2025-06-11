# Cấu hình giao diện Django Admin cho các model
from django.contrib import admin
from .models import Prescription, Medicine

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient_id', 'doctor_id', 'status']  
    search_fields = ['patient_id', 'doctor_id']
    list_filter = ['status']

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ['name', 'quantity', 'price']
    search_fields = ['name']