# Cấu hình giao diện Django Admin cho các model
from django.contrib import admin
from .models import LabRequest, LabResult

@admin.register(LabRequest)
class LabRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient_id', 'doctor_id', 'status']
    search_fields = ['patient_id', 'doctor_id']
    list_filter = ['status']

@admin.register(LabResult)
class LabResultAdmin(admin.ModelAdmin):
    list_display = ['lab_request', 'result_date']
    search_fields = ['lab_request__id']