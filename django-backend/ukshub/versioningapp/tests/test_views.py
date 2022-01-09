import json

from django.http import Http404
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

from .test_models import initialize_db_with_test_data, USER1_USERNAME, USER1_PASSWORD
from ..models import Branch, Repository, CollaborationType, Collaboration

JSON = 'application/json'

def get_jwt_token():
    c = Client()
    response = c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
    return json.loads(response.content.decode('UTF-8'))['access']

def get_mocked_repository(test_repository_name='Some_Repository_Test'):
    user_id = User.objects.get(username=USER1_USERNAME).pk

    repository = {
        "name": test_repository_name,
        "author": user_id,
        "description": "Some repo description"
    }

    return repository

class TestRepositoryListView(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_get_all_repositories(self):
        response = self.c.get('/versioning/repositories/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj), 2)

    def test_get_all_repositories_wrong_url(self):
        response = self.c.get('/versioning/repositorys', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_create_repository_successfully(self):
        test_repository_name = 'Test_Repository'
        repository = get_mocked_repository(test_repository_name)

        response = self.c.post(
            '/versioning/repositories/',
            data=json.dumps(repository),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['name'], test_repository_name)
    
    def test_post_create_repository_with_missing_field(self):
        test_repository_name = None
        repository = get_mocked_repository(test_repository_name)

        response = self.c.post(
            '/versioning/repositories/',
            data=json.dumps(repository),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)



