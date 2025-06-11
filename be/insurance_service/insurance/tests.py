# Tệp kiểm thử cho ứng dụng insurance
from django.test import TestCase
from rest_framework.test import APIClient

class InsuranceContractTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_insurance_contract(self):
        pass

class InsuranceClaimTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_insurance_claim(self):
        pass