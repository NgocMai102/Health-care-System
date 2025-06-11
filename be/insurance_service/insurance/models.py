# Định nghĩa các model cho insurance_service
from django.db import models

class InsuranceContract(models.Model):
    patient_id = models.IntegerField()
    policy_number = models.CharField(max_length=50, unique=True)
    provider = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    details = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Contract {self.policy_number} for Patient {self.patient_id}"

class InsuranceClaim(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    contract = models.ForeignKey(InsuranceContract, on_delete=models.CASCADE, related_name='claims')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    claim_date = models.DateTimeField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Claim for Contract {self.contract.policy_number}"