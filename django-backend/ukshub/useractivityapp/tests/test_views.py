import json

from django.test import TestCase, Client

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.test import APIClient

# User init consts
USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'

USER2_USERNAME = 'user2'
USER2_PASSWORD = 'Ovojejakasifra!'
USER2_FIRST_NAME = 'Ivana'
USER2_LAST_NAME = 'Perisic'
USER2_EMAIL = 'ica2@gmail.com'

USER3_USERNAME = 'user3'
USER3_PASSWORD = 'Ovojejakasifra!'
USER3_FIRST_NAME = 'Ivana'
USER3_LAST_NAME = 'Perisic'
USER3_EMAIL = 'ica3@gmail.com'

JSON = 'application/json'
# INFO: Do not change some values without a very good testing, because a lot of test cases are checked by those values
def initialize_db_with_test_data():
    # Create users
    user1 = User.objects.create_user(
      username=USER1_USERNAME, 
      password=USER1_PASSWORD,
      first_name=USER1_FIRST_NAME,
      last_name=USER1_LAST_NAME,
      email=USER1_EMAIL,
      is_superuser = True, 
      is_staff=True)

    user2 = User.objects.create_user(
      username=USER2_USERNAME, 
      password=USER2_PASSWORD,
      first_name=USER2_FIRST_NAME,
      last_name=USER2_LAST_NAME,
      email=USER2_EMAIL,
      is_superuser = False, 
      is_staff=False)

    user3 = User.objects.create_user(
      username=USER3_USERNAME, 
      password=USER3_PASSWORD,
      first_name=USER3_FIRST_NAME,
      last_name=USER3_LAST_NAME,
      email=USER3_EMAIL,
      is_superuser = False, 
      is_staff=False)

    user1.save()
    user2.save()
    user3.save()

def get_jwt_token(is_admin):
    c = Client()
    if (is_admin):
        response = c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
    else:
        response =c.post('/auth/jwt/create/', {'username': USER2_USERNAME, 'password': USER2_PASSWORD})
    return json.loads(response.content.decode('UTF-8'))['access']

def get_mocked_user(username, password, first_name, last_name, email):
    user = {
        "username": username, 
        "password": password,
        "first_name": first_name,
        "last_name": last_name,
        "email": email
    }
    return user

class TestUserAdminListView(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token(True)}'
        self.unauthorisedТoken = f'JWT {get_jwt_token(False)}'

    def test_get_all_users(self):
        response = self.c.get('/useractivity/manageusers/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),3)
    
    def test_get_HTTP403_all_users(self):
        response = self.c.get('/useractivity/manageusers/', HTTP_AUTHORIZATION=self.unauthorisedТoken, content_type=JSON)
        self.assertEqual(response.status_code, 403)

    def test_get_user_by_id(self):
        user = User.objects.get(username=USER2_USERNAME)
        response = self.c.get('/useractivity/manageusers/'+str(user.pk), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['username'], USER2_USERNAME)
        self.assertEqual(res_obj['email'], USER2_EMAIL)
        self.assertEqual(res_obj['first_name'], USER2_FIRST_NAME)
        self.assertEqual(res_obj['last_name'], USER2_LAST_NAME)

    def test_get_HTTP404_user_by_non_existent_id(self):
        response = self.c.get('/useractivity/manageusers/9999', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_user_successfully(self):
        test_user_username = 'Test user'
        test_user_email = 'testuser@gmail.com'
        test_user_password = 'U63rT3st'
        test_user_first_name = 'Petar'
        test_user_last_name = 'Petrovic'
        user = get_mocked_user(test_user_username, test_user_password, test_user_first_name, test_user_last_name, test_user_email)
  
        response = self.c.post(
            '/useractivity/manageusers/',
            data=json.dumps(user),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['username'], test_user_username)
        self.assertEquals(res_obj['first_name'], test_user_first_name)
        self.assertEquals(res_obj['last_name'], test_user_last_name)
        self.assertEquals(res_obj['email'], test_user_email)

    def test_put_user_change_data(self):
        u = User.objects.get(username=USER2_USERNAME)
        new_user_username = 'New_User_Username'
        new_user_email = 'New_User_Email@gmail.com'
        new_user_password = 'U63rT3st2'
        new_user_first_name = 'Uros'
        new_user_last_name = 'Urosevic'
        user = get_mocked_user(new_user_username, new_user_password, new_user_first_name, new_user_last_name, new_user_email)
  
        response = self.c.put(
            '/useractivity/manageusers/'+str(u.pk),
            data=json.dumps(user),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['username'], u.username)
        self.assertEqual(res_obj['username'], new_user_username)
        self.assertNotEqual(res_obj['email'], u.email)
        self.assertEqual(res_obj['email'], new_user_email)
        self.assertNotEqual(res_obj['first_name'], u.first_name)
        self.assertEqual(res_obj['first_name'], new_user_first_name)
        self.assertNotEqual(res_obj['last_name'], u.last_name)
        self.assertEqual(res_obj['last_name'], new_user_last_name)

    def test_put_HTTP404_user_change_data(self):
        new_user_username = 'New_User_Username'
        new_user_email = 'New_User_Email@gmail.com'
        new_user_password = 'U63rT3st2'
        new_user_first_name = 'Uros'
        new_user_last_name = 'Urosevic'
        user = get_mocked_user(new_user_username, new_user_password, new_user_first_name, new_user_last_name, new_user_email)
  
        response = self.c.put(
            '/useractivity/manageusers/9999',
            data=json.dumps(user),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'detail': 'Not found.'})

    def test_delete_user(self):
        user = User.objects.get(username=USER2_USERNAME)

        response = self.c.delete(
            '/useractivity/manageusers/'+str(user.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP404_user(self):
        response = self.c.delete(
            '/useractivity/manageusers/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        
        self.assertEquals(response.status_code, 404)