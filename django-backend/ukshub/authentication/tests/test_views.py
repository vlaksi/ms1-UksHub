import json

from django.utils import timezone
from django.http import Http404
from django.test import TestCase, Client
from django.urls import reverse

from .test_models import initialize_db_with_test_data, USER1_USERNAME, USER1_PASSWORD, USER1_EMAIL, USER1_FIRST_NAME, USER1_LAST_NAME 
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.test import APIClient

JSON = 'application/json'

# User init consts
USER2_USERNAME = 'user2'
USER2_PASSWORD = 'Ovojejakasifra!'
USER2_FIRST_NAME = 'Milana'
USER2_LAST_NAME = 'Mikic'
USER2_EMAIL = 'miki@gmail.com'

def get_jwt_token():
    c = Client()
    response = c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
    return json.loads(response.content.decode('UTF-8'))['access']

class Testauthentication(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_login(self):
        c = Client()
        response = c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
        self.assertEqual(response.status_code, 200)

    def test1_registration(self):
        c = Client()
        response = c.post('/auth/users/', {'username': USER2_USERNAME, 'password': USER2_PASSWORD, 're_password': USER2_PASSWORD, 'email': USER2_EMAIL, 'first_name': USER2_FIRST_NAME, 'last_name': USER2_LAST_NAME})
        self.assertEqual(response.status_code, 201)

    def test2_registration(self):
        c = Client()
        response = c.post('/auth/users/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD, 're_password': USER1_PASSWORD, 'email': USER1_EMAIL, 'first_name': USER1_FIRST_NAME, 'last_name': USER1_LAST_NAME})
        self.assertEqual(response.status_code, 400)

    def test_get_all_users(self):
        response = self.c.get('/auth/users/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),1)
