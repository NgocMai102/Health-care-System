# Cấu hình giao diện Django Admin cho các model
from django.contrib import admin
from .models import InsuranceContract, InsuranceClaim

@admin.register(InsuranceContract)
class InsuranceContractAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient_id', 'policy_number', 'provider']
    search_fields = ['patient_id', 'policy_number']

@admin.register(InsuranceClaim)
class InsuranceClaimAdmin(admin.ModelAdmin):
    list_display = ['id', 'contract', 'amount', 'status']
    search_fields = ['contract__patient_id']
    list_filter = ['status']