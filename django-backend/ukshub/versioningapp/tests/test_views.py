import json

from django.http import Http404
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

from .test_models import initialize_db_with_test_data, USER1_USERNAME, USER1_PASSWORD, REPOSITORY_1_NAME, REPOSITORY_2_NAME
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


class TestRepositoryDetailView(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_get_repository_by_id_successfully(self):
        repository = Repository.objects.get(name=REPOSITORY_1_NAME)
        response = self.c.get(
            '/versioning/repositories/'+str(repository.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['name'], REPOSITORY_1_NAME)
        self.assertEqual(res_obj['actions'], [])

    def test_get_HTTP404_repository_by_id(self):
        response = self.c.get(
            '/versioning/repositories/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        self.assertEqual(response.status_code, 404)

    def test_put_repository_change_name(self):
        repository = Repository.objects.get(name=REPOSITORY_1_NAME)
        new_repository_name = 'New_Repository_Name'
        new_repository = get_mocked_repository(new_repository_name)

        response = self.c.put(
            '/versioning/repositories/'+str(repository.pk),
            data=json.dumps(new_repository),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['name'], repository.name)
        self.assertEqual(res_obj['name'], new_repository_name)

    def test_put_HTTP404_repository_change_name(self):
        repository = Repository.objects.get(name=REPOSITORY_1_NAME)
        new_repository_name = 'New_Repository_Name'
        new_repository = get_mocked_repository(new_repository_name)

        response = self.c.put(
            '/versioning/repositories/99999',
            data=json.dumps(new_repository),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 404)


    def test_delete_repository(self):
        repository = Repository.objects.get(name=REPOSITORY_1_NAME)

        response = self.c.delete(
            '/versioning/repositories/'+str(repository.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP404_repository(self):
        repository = Repository.objects.get(name=REPOSITORY_1_NAME)

        response = self.c.delete(
            '/versioning/repositories/999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)