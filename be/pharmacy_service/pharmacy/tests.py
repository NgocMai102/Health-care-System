# Tệp kiểm thử cho ứng dụng pharmacy
from django.test import TestCase
from rest_framework.test import APIClient

class PrescriptionTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_prescription(self):
        pass

class MedicineTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_medicine(self):
        pass