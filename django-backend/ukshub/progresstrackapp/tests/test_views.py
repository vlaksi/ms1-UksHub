import json

from django.http import Http404
from django.test import TestCase, Client
from django.urls import reverse

from .test_models import initialize_db_with_test_data, USER1_USERNAME, USER1_PASSWORD, PULL_REQUEST_1_TITLE
from ..models import Issue, Label, Milestone, PullRequest
from versioningapp.models import Branch, Repository

from rest_framework.test import APIClient

JSON = 'application/json'

def get_jwt_token():
    c = Client()
    response = c.post('/auth/jwt/create/', {'username': USER1_USERNAME, 'password': USER1_PASSWORD})
    return json.loads(response.content.decode('UTF-8'))['access']

def get_repo_id(repository_id=0):
    if repository_id != -1:
        repo_id = Repository.objects.all()[repository_id].id
    else: # return repo_id that for sure does not exist
        repositories = Repository.objects.all()
        repo_id = repositories[len(repositories) - 1].id + 999
    return repo_id

class TestPullRequestListView(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def get_repository_pull_requests(self, repository_id=0):
        repo_id = get_repo_id(repository_id)
        response = self.client.get(reverse('all-repository-pull-requests', kwargs={'repo_id': repo_id}))
        return response, repo_id

    def test_get_all_repository_pull_requests(self):
        response, _ = self.get_repository_pull_requests()
        self.assertEqual(response.status_code, 200)

    def test_get_all_repository_pull_requests(self):
        response, _ = self.get_repository_pull_requests()
        self.assertEqual(response.status_code, 200)

    def test_get_HTTP404_if_pull_request_does_not_exist(self):
        response, _ = self.get_repository_pull_requests(-1)
        self.assertEqual(response.status_code, 404)

    def test_get_all_pull_requests(self):
        response = self.c.get('/progresstrack/pullrequests/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),3)

    def test_get_pull_request_by_id(self):
        pr = PullRequest.objects.get(title=PULL_REQUEST_1_TITLE)
        response = self.c.get('/progresstrack/pullrequests/'+str(pr.pk), HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['title'], PULL_REQUEST_1_TITLE)
        self.assertEqual(res_obj['issues'], [])
        self.assertEqual(res_obj['milestones'], [])
        self.assertEqual(res_obj['labels'], [])
        self.assertEqual(res_obj['comments'], [])

    def test_get_HTTP404_wrong_endpoint_call_pull_request_by_id(self):
        # wrong is because we should not have / on the end of the endpoint !
        pr = PullRequest.objects.get(title=PULL_REQUEST_1_TITLE) 
        response = self.c.get('/progresstrack/pullrequests/'+str(pr.pk)+'/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)
    
    def test_get_HTTP404_pull_request_by_non_existent_id(self):
        response = self.c.get('/progresstrack/pullrequests/9999', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)
