from django.http import Http404
from django.test import TestCase
from django.urls import reverse

from .test_models import initialize_db_with_test_data
from versioningapp.models import Branch, Repository


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

    def test_HTTP404_if_pull_request_does_not_exist(self):
        response, _ = self.get_repository_pull_requests(-1)
        self.assertEqual(response.status_code, 404)