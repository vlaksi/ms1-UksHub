import json

from django.utils import timezone
from django.http import Http404
from django.test import TestCase, Client
from django.urls import reverse

from .test_models import initialize_db_with_test_data, USER1_USERNAME, USER1_PASSWORD, USER1_EMAIL, USER1_FIRST_NAME, USER1_LAST_NAME, USER3_USERNAME, USER3_PASSWORD
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
    user = {
        "username": USER2_USERNAME,
        "email": USER2_EMAIL,
        "first_name": test_user_firstname,
        "last_name": USER2_LAST_NAME,
        "password": USER2_PASSWORD
    }
    return user

def get_mocked_jwt():
    return  {
        "token": get_jwt_token()
    }

def get_mocked_password():
    return  {
        "current_password": USER3_PASSWORD
    }

def get_mocked_new_username():
    return  {
        "new_username": USER3_USERNAME
    }

def get_mocked_data_for_user_activation():
  
    invalid_uid = "Mg"
    invalid_token = "awfeq5-e1f3944bf0b4dd5d272c7834f1b894e2"
    return  {
        "uid": invalid_uid,
        "token": invalid_token
    }

def get_mocked_email():
    return  {
        "email": USER1_EMAIL
    }

def get_mocked_reset_password():
    invalid_uid = "Mg"
    invalid_token = "awfeq5-e1f3944bf0b4dd5d272c7834f1b894e2"
    return  {
        "uid": invalid_uid,
        "token": invalid_token,
        "new_password": 'Novasifra123!'
    }

def get_mocked_set_password():
    return  {
        "new_password": USER2_PASSWORD,
        "re_new_password": USER2_PASSWORD,
        "current_password": USER1_PASSWORD
    }

def get_mocked_set_username():
    return  {
        "current_password": USER1_PASSWORD,
        "new_username": USER2_USERNAME,
        "re_new_username": USER2_USERNAME
    }


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
        self.assertEqual(len(res_obj),2)

    def test_refresh_token(self):
        response = self.c.post('/auth/jwt/refresh/', {'refresh': self.token})
        self.assertEqual(response.status_code, 401)
        
    # TODO: NEMANJA, Fix this test
    # def test_jwt_token_verify(self):
    #     response = self.c.post('/auth/jwt/verify/',  data=json.dumps(get_mocked_jwt()), content_type=JSON)
    #     self.assertEqual(response.status_code, 200)

    def test_get_user(self):
        u = User.objects.get(username=USER1_USERNAME)
        response = self.c.get('/auth/users/'+str(u.pk)+'/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
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
        response = self.c.delete('/auth/users/'+str(u.pk)+'/', data=json.dumps(get_mocked_password()) , HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 204)

    def test_activation_user(self):
        response = self.c.post('/auth/users/activation/', data=json.dumps(get_mocked_data_for_user_activation()) , HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 400)

    def test_get_me(self):
        response = self.c.get('/auth/users/me/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),5)
    
    def test_put_me(self):
        u = User.objects.get(username=USER1_USERNAME)
        new_user_first_name = 'New_User_Firstname'
        user = get_mocked_user(new_user_first_name)

        response = self.c.put('/auth/users/me/',  data=json.dumps(user), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['first_name'], u.first_name)
        self.assertEqual(res_obj['first_name'], new_user_first_name)

    def test_patch_me(self):
        u = User.objects.get(username=USER1_USERNAME)
        new_user_first_name = 'New_User_Firstname'
        user = get_mocked_user(new_user_first_name)

        response = self.c.patch('/auth/users/me/',  data=json.dumps(user), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['first_name'], u.first_name)
        self.assertEqual(res_obj['first_name'], new_user_first_name)
    
    def test_delete_me(self):
        response = self.c.delete('/auth/users/me/',  data=json.dumps(get_mocked_password()), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 204)
    
    def test_disabled_resend_activation(self):
        response = self.c.post('/auth/users/resend_activation/', data=json.dumps(get_mocked_email()), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 400)
    
    def test_reset_password(self):
        response = self.c.post('/auth/users/reset_password/',  data=json.dumps(get_mocked_email()), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 204)
    
    def test_reset_password_confirm(self):
        response = self.c.post('/auth/users/reset_password_confirm/',  data=json.dumps(get_mocked_reset_password()), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 400)
    
    def test_reset_username(self):
        response = self.c.post('/auth/users/reset_username/',  data=json.dumps(get_mocked_email()), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 204)
    
    def test_disabled_reset_username_confirm(self):
        response = self.c.post('/auth/users/reset_username_confirm/',  data=json.dumps(get_mocked_new_username()), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 400)
    
    def test_set_password(self):
        response = self.c.post('/auth/users/set_password/',  data=json.dumps(get_mocked_set_password()), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 204)
    
    def test_set_username(self):
        response = self.c.post('/auth/users/set_username/',  data=json.dumps(get_mocked_set_username()), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 204)
