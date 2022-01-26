import json

from django.utils import timezone
from django.http import Http404
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

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

def get_mocked_pr(test_pr_name='Some_PR_Test'):
    user_id = User.objects.get(username=USER1_USERNAME).pk
    repo_id = Repository.objects.get(author=user_id, name="RepoUKS").pk
    base_branch_id = Branch.objects.get(repository=repo_id, name='main').pk
    compare_branch_id = Branch.objects.get(repository=repo_id, name='develop').pk

    pull_request = {
        "repository": repo_id,
        "base_branch": base_branch_id,
        "compare_branch": compare_branch_id,
        "creation_date": "2022-01-05T00:28:03.966Z",
        "title": test_pr_name,
        "author": user_id
    }
    return pull_request

def get_mocked_milestone(test_milestone_name='Some_Milestone_Test', test_milestone_description ='Some_Milestone_Desc',test_milestone_due_date="2022-01-29 01:00:00+01"):
    user_id = User.objects.get(username=USER1_USERNAME).pk
    repo_id = Repository.objects.get(author=user_id, name="RepoUKS").pk

    milestone = {
        "title": test_milestone_name,
        "description":test_milestone_description,
        "due_date":test_milestone_due_date,
        "repository":repo_id
    }
    return milestone

def get_mocked_label(test_label_name='Some_Label_Test', test_label_color='Some_Label_Color',test_label_decription="Some_Label_Description"):
    user_id = User.objects.get(username=USER1_USERNAME).pk
    repo_id = Repository.objects.get(author=user_id, name="RepoUKS").pk

    label = {
        "name": test_label_name,
        "color":test_label_color,
        "decription":test_label_decription,
        "repository":repo_id
    }
    return label

def get_mocked_issue(test_issue_name='Some_Issue_Test'):
    user_id = User.objects.get(username=USER1_USERNAME).pk
    repo_id = Repository.objects.get(author=user_id, name="RepoUKS").pk

    issue = {
        "title": test_issue_name,
        "creation_date":"2022-01-22 22:05:48.078+01",
        "is_opened":True,
        "author":user_id,
        "repository":repo_id
    }
    return issue

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
        pr = PullRequest.objects.get(title=PULL_REQUEST_1_TITLE) 
        # wrong is because we should not have / on the end of the endpoint !
        response = self.c.get('/progresstrack/pullrequests/'+str(pr.pk)+'/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)
    
    def test_get_HTTP404_pull_request_by_non_existent_id(self):
        response = self.c.get('/progresstrack/pullrequests/9999', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_pull_request_successfully(self):
        test_pr_name = 'Test_PR'
        pull_request = get_mocked_pr(test_pr_name)
  
        response = self.c.post(
            '/progresstrack/pullrequests/',
            data=json.dumps(pull_request),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['title'], test_pr_name)

    def test_put_pull_request_change_title(self):
        pr = PullRequest.objects.get(title=PULL_REQUEST_1_TITLE)
        new_pr_name = 'New_PR_Name'
        pull_request = get_mocked_pr(new_pr_name)

        response = self.c.put(
            '/progresstrack/pullrequests/'+str(pr.pk),
            data=json.dumps(pull_request),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['title'], pr.title)
        self.assertEqual(res_obj['title'], new_pr_name)

    def test_put_HTTP404_pull_request_change_title(self):
        pr = PullRequest.objects.get(title=PULL_REQUEST_1_TITLE)
        new_pr_name = 'New_PR_Name'
        pull_request = get_mocked_pr(new_pr_name)

        response = self.c.put(
            '/progresstrack/pullrequests/99999',
            data=json.dumps(pull_request),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 404)
        self.assertEquals(res_obj, {'detail': 'Not found.'})

    def test_delete_pull_request(self):
        pr = PullRequest.objects.get(title=PULL_REQUEST_1_TITLE)

        response = self.c.delete(
            '/progresstrack/pullrequests/'+str(pr.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP404_pull_request(self):
        pr = PullRequest.objects.get(title=PULL_REQUEST_1_TITLE)

        response = self.c.delete(
            '/progresstrack/pullrequests/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        
        self.assertEquals(response.status_code, 404)

class TestLabelListView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def get_repository_labels(self, repository_id=0):
        repo_id = get_repo_id(repository_id)
        response = self.client.get(reverse('all-repository-labels', kwargs={'repo_id': repo_id}))
        return response, repo_id

    def test_get_all_repository_labels(self):
        response, _ = self.get_repository_labels()
        self.assertEqual(response.status_code, 200)

    def test_get_HTTP404_if_label_does_not_exist(self):
        response, _ = self.get_repository_labels(-1)
        self.assertEqual(response.status_code, 404)

    def test_get_all_labels(self):
        response = self.c.get('/progresstrack/labels/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),2)

    def test_get_all_labels_wrong_url(self):
        response = self.c.get('/progresstrack/label', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_create_label_successfully(self):
        test_label_name = 'Test_Label'
        label = get_mocked_label(test_label_name)

        response = self.c.post(
            '/progresstrack/labels/',
            data=json.dumps(label),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['name'], test_label_name)
    
    def test_post_create_label_with_missing_name(self):
        test_label_name = None
        label = get_mocked_label(test_label_name)

        response = self.c.post(
            '/progresstrack/labels/',
            data=json.dumps(label),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)

    def test_post_create_label_with_missing_color(self):
        test_label_color = None
        label = get_mocked_label(test_label_color)

        response = self.c.post(
            '/progresstrack/labels/',
            data=json.dumps(label),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)
    
    def test_post_create_label_with_missing_description(self):
        test_label_decription = None
        label = get_mocked_label(test_label_decription)

        response = self.c.post(
            '/progresstrack/labels/',
            data=json.dumps(label),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)


class TestLabelDetailView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_get_HTTP404_label_by_id(self):
        response = self.c.get(
            '/progresstrack/labels/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        self.assertEqual(response.status_code, 404)

    def test_get_label_by_id_successfully(self):
        label = Label.objects.get(name='label1')
        response = self.c.get(
            '/progresstrack/labels/'+str(label.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['name'], 'label1')
       

    def test_delete_label(self):
        label = Label.objects.get(name='label1')

        response = self.c.delete(
            '/progresstrack/labels/'+str(label.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP404_label(self):
        label = Label.objects.get(name='label1')

        response = self.c.delete(
            '/progresstrack/labels/999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)
    
    def test_put_HTTP404_label_change_name(self):
        label = Label.objects.get(name='label1')
        new_label_name = 'New_Label_Name'
        new_label = get_mocked_label(new_label_name)

        response = self.c.put(
            '/progresstrack/labels/99999',
            data=json.dumps(new_label),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 404)

    def test_put_label_change_label(self):
        label = Label.objects.get(name='label1')
        new_label_name = 'New_Label_Name'
        new_label_color = 'New_Label_Color'
        new_label_decription = 'New_Label_Description'
        new_label = get_mocked_label(new_label_name,new_label_color,new_label_decription)

        response = self.c.put(
             '/progresstrack/labels/'+str(label.pk),
            data=json.dumps(new_label),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['name'], label.name)
        self.assertEqual(res_obj['name'], new_label_name)
        self.assertNotEqual(res_obj['color'], label.color)
        self.assertEqual(res_obj['color'], new_label_color)
        self.assertNotEqual(res_obj['decription'], label.decription)
        self.assertEqual(res_obj['decription'], new_label_decription)

class TestMilestoneListView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def get_repository_milestones(self, repository_id=0):
        repo_id = get_repo_id(repository_id)
        response = self.client.get(reverse('all-repository-milestones', kwargs={'repo_id': repo_id}))
        return response, repo_id

    def test_get_all_repository_milestones(self):
        response, _ = self.get_repository_milestones()
        self.assertEqual(response.status_code, 200)

    def test_get_HTTP404_if_milestone_does_not_exist(self):
        response, _ = self.get_repository_milestones(-1)
        self.assertEqual(response.status_code, 404)

    def test_get_all_milestones(self):
        response = self.c.get('/progresstrack/milestones/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),2)

    def test_get_all_milestones_wrong_url(self):
        response = self.c.get('/progresstrack/milestone', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_create_milestone_successfully(self):
        test_milestone_name = 'Test_Milestonel'
        test_milestone_description='Test_Milestone1_Desc'
        milestone = get_mocked_milestone(test_milestone_name,test_milestone_description)

        response = self.c.post(
            '/progresstrack/milestones/',
            data=json.dumps(milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['title'], test_milestone_name)
        self.assertEquals(res_obj['description'], test_milestone_description)

    def test_post_create_milestone_with_missing_name(self):
        test_milestone_name = None
        milestone = get_mocked_milestone(test_milestone_name)

        response = self.c.post(
            '/progresstrack/milestones/',
            data=json.dumps(milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)

    def test_post_create_milestone_with_missing_description(self):
        test_milestone_description = None
        milestone = get_mocked_milestone(test_milestone_description)

        response = self.c.post(
            '/progresstrack/milestones/',
            data=json.dumps(milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)

    def test_post_create_milestone_with_missing_date(self):
        test_milestone_due_date = None
        milestone = get_mocked_milestone(test_milestone_due_date)

        response = self.c.post(
            '/progresstrack/milestones/',
            data=json.dumps(milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)

class TestMilestoneDetailView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_get_HTTP404_milestone_by_id(self):
        response = self.c.get(
            '/progresstrack/milestones/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        self.assertEqual(response.status_code, 404)

    def test_get_milestone_by_id_successfully(self):
        milestone = Milestone.objects.get(title='milestone1')
        response = self.c.get(
            '/progresstrack/milestones/'+str(milestone.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['title'], 'milestone1')
       

    def test_delete_milestone(self):
        milestone = Milestone.objects.get(title='milestone1')

        response = self.c.delete(
            '/progresstrack/milestones/'+str(milestone.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)

    def test_delete_HTTP404_milestone(self):
        milestone = Milestone.objects.get(title='milestone1')

        response = self.c.delete(
            '/progresstrack/milestones/999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)
    
    def test_put_HTTP404_milestone_change_name(self):
        milestone = Milestone.objects.get(title='milestone1')
        new_milestone_name = 'New_Milestone_Name'
        new_milestone = get_mocked_milestone(new_milestone_name)

        response = self.c.put(
            '/progresstrack/milestones/99999',
            data=json.dumps(new_milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 404)

    def test_put_milestone_change_milestone(self):
        milestone = Milestone.objects.get(title='milestone1')
        new_milestone_name = 'New_Milestone_Name'
        new_milestone_description = 'New_Milestone_Description'
        new_milestone = get_mocked_milestone(new_milestone_name,new_milestone_description)

        response = self.c.put(
             '/progresstrack/milestones/'+str(milestone.pk),
            data=json.dumps(new_milestone),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['title'], milestone.title)
        self.assertEqual(res_obj['title'], new_milestone_name)
        self.assertNotEqual(res_obj['description'], milestone.description)
        self.assertEqual(res_obj['description'], new_milestone_description)
    
class TestIssueListView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def get_repository_issues(self, repository_id=0):
        repo_id = get_repo_id(repository_id)
        response = self.client.get(reverse('all-repository-issues', kwargs={'repo_id': repo_id}))
        return response, repo_id

    def test_get_all_repository_issues(self):
        response, _ = self.get_repository_issues()
        self.assertEqual(response.status_code, 200)

    def test_get_HTTP404_if_issue_does_not_exist(self):
        response, _ = self.get_repository_issues(-1)
        self.assertEqual(response.status_code, 404)

    def test_get_all_issues(self):
        response = self.c.get('/progresstrack/issues/', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        res_obj = json.loads(response.content.decode('UTF-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),3)

    def test_get_all_issues_wrong_url(self):
        response = self.c.get('/progresstrack/issue', HTTP_AUTHORIZATION=self.token, content_type=JSON)
        self.assertEqual(response.status_code, 404)

    def test_post_create_issue_successfully(self):
        test_issue_name = 'Test_Issuel'
        issue = get_mocked_issue(test_issue_name)

        response = self.c.post(
            '/progresstrack/issues/',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 201)
        self.assertEquals(res_obj['title'], test_issue_name)

    def test_post_create_issue_with_missing_name(self):
        test_issue_name = None
        issue = get_mocked_issue(test_issue_name)

        response = self.c.post(
            '/progresstrack/issues/',
            data=json.dumps(issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 400)

class TestIssueDetailView(TestCase):
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def setUp(self) -> None:
        self.c = Client()
        self.token = f'JWT {get_jwt_token()}'

    def test_get_HTTP404_issue_by_id(self):
        response = self.c.get(
            '/progresstrack/issues/99999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        self.assertEqual(response.status_code, 404)

    def test_get_issue_by_id_successfully(self):
        issue = Issue.objects.get(title='issue1')
        response = self.c.get(
            '/progresstrack/issues/'+str(issue.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(res_obj['title'], 'issue1')

    def test_get_all_issue_labels_by_id_successfully(self):
        issue = Issue.objects.get(title='issue3')
        response = self.c.get(
            '/progresstrack/issue/'+str(issue.pk)+'/labels',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
 
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),2)
    
    def test_get_all_issue_labels_by_id_successfully_empty(self):
        issue = Issue.objects.get(title='issue1')
        response = self.c.get(
            '/progresstrack/issue/'+str(issue.pk)+'/labels',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))
 
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(res_obj),0)
    
    def test_delete_issue(self):
        issue = Issue.objects.get(title='issue1')

        response = self.c.delete(
            '/progresstrack/issues/'+str(issue.pk),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 204)
    
    def test_delete_HTTP404_issue(self):
        issue = Issue.objects.get(title='issue1')

        response = self.c.delete(
            '/progresstrack/issues/999',
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )

        self.assertEquals(response.status_code, 404)
    
    def test_put_HTTP404_issue_change_name(self):
        issue = Issue.objects.get(title='issue1')
        new_issue_name = 'New_Issue_Name'
        new_issue = get_mocked_issue(new_issue_name)

        response = self.c.put(
            '/progresstrack/issues/99999',
            data=json.dumps(new_issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 404)

    def test_put_issue_change_name(self):
        issue = Issue.objects.get(title='issue1')
        new_issue_name = 'New_Issue_Name'
        new_issue = get_mocked_issue(new_issue_name)

        response = self.c.put(
             '/progresstrack/issues/'+str(issue.pk),
            data=json.dumps(new_issue),
            HTTP_AUTHORIZATION=self.token,
            content_type=JSON
        )
        res_obj = json.loads(response.content.decode('UTF-8'))

        self.assertEquals(response.status_code, 200)
        self.assertNotEqual(res_obj['title'], issue.title)
        self.assertEqual(res_obj['title'], new_issue_name)


       


    
    

    

    

    
    

      