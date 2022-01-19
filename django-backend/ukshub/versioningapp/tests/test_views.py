import json

from django.http import Http404
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

from .test_models import initialize_db_with_test_data, USER1_USERNAME, USER2_USERNAME,USER1_PASSWORD, REPOSITORY_1_NAME,REPOSITORY_2_NAME, COLLABORATION_TYPE_OWNER, COLLABORATION_TYPE_DEVELOPER
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

def get_mocked_branch(test_branch_name='Some_Branch_Test'):
    repository_id = Repository.objects.get(name=REPOSITORY_1_NAME).pk

    branch = {
        "name": test_branch_name,
        "repository": repository_id
    }

    return branch

def get_mocked_collaboration(
        test_user_username=USER2_USERNAME,
        test_repository_name=REPOSITORY_1_NAME,
        test_collaboration_type_name=COLLABORATION_TYPE_OWNER
    ):
    user_id = User.objects.get(username=test_user_username).pk
    repository_id = Repository.objects.get(name=test_repository_name).pk
    collaboration_type_id = CollaborationType.objects.get(name=test_collaboration_type_name).pk

    collaboration = {
        "collaborator": user_id,
        "repository": repository_id,
        "collaboration_type": collaboration_type_id
    }

    return collaboration

def get_collaboration(index=0):
    return Collaboration.objects.all()[index]

def get_repository(index=0):
    return Repository.objects.all()[index]

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

    def test_post_create_repository_with_default_branch_and_collaborators(self):
        test_repository_name = 'Test_Repository'
        repository = get_mocked_repository(test_repository_name)

        # Create repository
        created_repository_response = self.c.post(
            '/versioning/repositories/',
            data=json.dumps(repository),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        repository_res_obj = json.loads(created_repository_response.content.decode('UTF-8'))
        self.assertEquals(created_repository_response.status_code, 201)
        self.assertEquals(repository_res_obj['name'], test_repository_name)

        # Check repository branches
        repository_branches_response = self.c.get(
            '/versioning/repository/'+str(repository_res_obj['pk'])+'/branches/',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        repository_branches_res_obj = json.loads(repository_branches_response.content.decode('UTF-8'))
        self.assertEquals(repository_branches_response.status_code, 200)
        self.assertEqual(len(repository_branches_res_obj),1) # only default branch should be created ie. main, and because of that is len == 1

        # Check repository collaborators
        repository_collaborators_response = self.c.get(
            '/versioning/repository/'+str(repository_res_obj['pk'])+'/collaborators/',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        repository_collaborators_res_obj = json.loads(repository_collaborators_response.content.decode('UTF-8'))
        self.assertEquals(repository_collaborators_response.status_code, 200)
        self.assertEqual(len(repository_collaborators_res_obj),1) # only author should be collaborator, and because of that is len == 1

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

    def test_get_user_repositories_by_user_id(self):
        user = User.objects.get(username=USER1_USERNAME)

        response = self.c.get(
            '/versioning/users/'+str(user.pk)+'/repositories',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        
        self.assertEquals(response.status_code, 200)
        self.assertEqual(len(res_obj),2)

    def test_get_repository_branches(self):
        repository = Repository.objects.get(name=REPOSITORY_1_NAME)
        response = self.c.get(
            '/versioning/repository/'+str(repository.pk)+'/branches/',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
        
        self.assertEquals(response.status_code, 200)
        self.assertEqual(len(res_obj),2)

    def test_get_user_repositories_by_user_id_with_no_repositories(self):
        user = User.objects.get(username=USER2_USERNAME)

        response = self.c.get(
            '/versioning/users/'+str(user.pk)+'/repositories',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        
        self.assertEquals(response.status_code, 404)

    def test_get_HTTP404_user_repositories_by_user_id(self):
        user = User.objects.get(username=USER1_USERNAME)

        response = self.c.get(
            '/versioning/users/9999/repositories',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        
        self.assertEquals(response.status_code, 404)

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

class TestCollaborationListView(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_get_all_collaborations(self):
        response = self.c.get('/versioning/collaborations/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj), 3)

    def test_get_all_collaborations_wrong_url(self):
        response = self.c.get('/versioning/collaboratins', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_get_all_collaboration_types(self):
        response = self.c.get('/versioning/collaboration/types/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj), 2)

    def test_get_all_collaboration_types_wrong_url(self):
        response = self.c.get('/versioning/collaborations/types/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_create_collaboration_successfully(self):
        user_id = User.objects.get(username=USER1_USERNAME).pk
        collaboration = get_mocked_collaboration(USER1_USERNAME)

        response = self.c.post(
            '/versioning/collaborations/',
            data=json.dumps(collaboration),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['collaborator'], user_id)

    def test_post_HTTP404_create_collaboration(self):
        collaboration = get_mocked_collaboration(USER1_USERNAME)

        response = self.c.post(
            '/versioning/collaboratns/',
            data=json.dumps(collaboration),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)

    def test_post_create_collaboration_without_existed_user(self):
        with self.assertRaises(User.DoesNotExist):
            collaboration = get_mocked_collaboration("Not Existed Username")

            # Will not pass here because of the raised exception
            response = self.c.post(
                '/versioning/collaborations/',
                data=json.dumps(collaboration),
                HTTP_AUTHORIZATION=self.token,
                content_type=JSON
            )

            self.assertEquals(response.status_code, 201)

    def test_post_create_collaboration_without_existed_repository(self):
        with self.assertRaises(Repository.DoesNotExist):
            collaboration = get_mocked_collaboration(USER1_USERNAME, "Not Existed Repository")

            # Will not pass here because of the raised exception
            response = self.c.post(
                '/versioning/collaborations/',
                data=json.dumps(collaboration),
                HTTP_AUTHORIZATION=self.token,
                content_type=JSON
            )

            self.assertEquals(response.status_code, 201)

    def test_post_create_collaboration_without_existed_collaboration_type(self):
        with self.assertRaises(CollaborationType.DoesNotExist):
            collaboration = get_mocked_collaboration(USER1_USERNAME, REPOSITORY_1_NAME, "Not Existed CollaborationType")

            # Will not pass here because of the raised exception
            response = self.c.post(
                '/versioning/collaborations/',
                data=json.dumps(collaboration),
                HTTP_AUTHORIZATION=self.token,
                content_type=JSON
            )

            self.assertEquals(response.status_code, 201)
    
class TestCollaborationDetailView(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_get_collaboration_by_id_successfully(self):
        collaboration = get_collaboration()
        repository = get_repository()

        response = self.c.get(
            '/versioning/collaborations/'+str(collaboration.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['repository'], repository.pk)

    def test_get_HTTP404_collaboration_by_id(self):

        response = self.c.get(
            '/versioning/collaborations/9999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEqual(response.status_code, 404)

    def test_put_change_collaboration_collaboration_type(self):
        collaboration = get_collaboration()
        new_collaboration_type = CollaborationType.objects.get(name=COLLABORATION_TYPE_DEVELOPER)
        new_collaboration_type_name = new_collaboration_type.name
        mocked_collaboration = get_mocked_collaboration(USER1_USERNAME, REPOSITORY_1_NAME, new_collaboration_type_name)

        response = self.c.put(
            '/versioning/collaborations/'+str(collaboration.pk),
            data=json.dumps(mocked_collaboration),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEquals(res_obj['collaboration_type'], collaboration.collaboration_type)
        self.assertEquals(res_obj['collaboration_type'], new_collaboration_type.pk)

    def test_put_HTTP404_change_collaboration_collaboration_type(self):
        mocked_collaboration = get_mocked_collaboration()

        response = self.c.put(
            '/versioning/collaborations/9999',
            data=json.dumps(mocked_collaboration),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)

    def test_delete_collaboration(self):
        collaboration = get_collaboration()

        response = self.c.delete(
            '/versioning/collaborations/'+str(collaboration.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP404_collaboration(self):

        response = self.c.delete(
            '/versioning/collaborations/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)

class TestBranchListView(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_get_all_branches(self):
        response = self.c.get('/versioning/branchs/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj), 4)

    def test_get_all_branches_wrong_url(self):
        response = self.c.get('/versioning/branches', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_create_branch_successfully(self):
        test_branch_name = 'Test_Branch'
        branch = get_mocked_branch(test_branch_name)

        response = self.c.post(
            '/versioning/branchs/',
            data=json.dumps(branch),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['name'], test_branch_name)
    
    def test_post_create_branch_with_missing_field(self):
        test_branch_name = None
        branch = get_mocked_branch(test_branch_name)

        response = self.c.post(
            '/versioning/branchs/',
            data=json.dumps(branch),
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

    def test_delete_repository(self):
        branch = Branch.objects.get(name='repo1-develop')

        response = self.c.delete(
            '/versioning/branchs/'+str(branch.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP404_repository(self):
        response = self.c.delete(
            '/versioning/branchs/999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)