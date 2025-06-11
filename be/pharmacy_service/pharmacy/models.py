from django.db import models

class Prescription(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'), 
        ('dispensed', 'Dispensed'),
        ('cancelled', 'Cancelled'),
    )
    patient_id = models.IntegerField()
    doctor_id = models.IntegerField()
    diagnosis_id = models.IntegerField()
    details = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Prescription {self.id} for Patient {self.patient_id}"

class Medicine(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Medicine {self.name}"