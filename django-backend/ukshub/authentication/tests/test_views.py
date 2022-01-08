import json

from django.utils import timezone
from django.http import Http404
from django.test import TestCase, Client
from django.urls import reverse

from .test_models import initialize_db_with_test_data, USER1_USERNAME, USER1_PASSWORD
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.test import APIClient

JSON = 'application/json'

class Testauthentication(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def get_jwt_token():
        c = Client()
        response = c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
        self.assertEqual(response.status_code, 200)
   
