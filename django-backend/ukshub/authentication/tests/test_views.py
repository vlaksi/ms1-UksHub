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
USER2_PASSWORD = 'Ovojejakasifra!!'
USER2_FIRST_NAME = 'Milana'
USER2_LAST_NAME = 'Mikic'
USER2_EMAIL = 'miki@gmail.com'

def get_jwt_token():
    c = Client()
    response = c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
    return json.loads(response.content.decode('UTF-8'))['access']

def get_mocked_user(test_user_firstname='Some_USER_Test'):
    user_id = User.objects.get(username=USER1_USERNAME).pk

    user = {
        "username": USER2_USERNAME,
        "email": USER2_EMAIL,
        "first_name": test_user_firstname,
        "last_name": USER2_LAST_NAME,
        "password": USER2_PASSWORD
    }
    return user

class TestAuthenticationViews(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_success_login(self):
        response = self.c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
        self.assertEqual(response.status_code, 200)

    def test_failure_login(self):
        response = self.c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER2_PASSWORD})
        self.assertEqual(response.status_code, 401)

    def test_success_registration(self):
        response = self.c.post('/auth/users/', {'username': USER2_USERNAME, 'password': USER2_PASSWORD, 're_password': USER2_PASSWORD, 'email': USER2_EMAIL, 'first_name': USER2_FIRST_NAME, 'last_name': USER2_LAST_NAME})
        self.assertEqual(response.status_code, 201)

    def test_failure_registration(self):
        response = self.c.post('/auth/users/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD, 're_password': USER1_PASSWORD, 'email': USER1_EMAIL, 'first_name': USER1_FIRST_NAME, 'last_name': USER1_LAST_NAME})
        self.assertEqual(response.status_code, 400)

    def test_get_all_users(self):
        response = self.c.get('/auth/users/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),1)

    def test_refresh_token(self):
        response = self.c.post('/auth/jwt/refresh/', {'refresh': self.token})
        self.assertEqual(response.status_code, 401)
    
    def test_jwt_token_verify(self):
        response = self.c.post('/auth/jwt/verify/', HTTP_AUTHORIZATION=self.token, data=json.dumps({"token": self.token}), content_type=JSON)
        self.assertEqual(response.status_code, 200)

    def test_get_user(self):
        pr = User.objects.get(username=USER1_USERNAME)
        response = self.c.get('/auth/users/'+str(pr.pk)+'/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
    
    def test_put_user(self):
        u = User.objects.get(username=USER1_USERNAME)
        new_user_first_name = 'New_User_Firstname'
        user = get_mocked_user(new_user_first_name)

        response = self.c.put(
           '/auth/users/'+str(u.pk)+'/',
            data=json.dumps(user),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['first_name'], u.first_name)
        self.assertEqual(res_obj['first_name'], new_user_first_name)
    
    def test_patch_user(self):
        u = User.objects.get(username=USER1_USERNAME)
        new_user_first_name = 'New_User_Firstname'
        user = get_mocked_user(new_user_first_name)

        response = self.c.patch(
           '/auth/users/'+str(u.pk)+'/',
            data=json.dumps(user),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['first_name'], u.first_name)
        self.assertEqual(res_obj['first_name'], new_user_first_name)
    
    def test_delete_user(self):
        u = User.objects.get(username=USER1_USERNAME)
        response = self.c.delete('/auth/users/'+str(u.pk)+'/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 400)