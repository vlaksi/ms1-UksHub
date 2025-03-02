from django.utils import timezone
from django.test import TestCase

from ..models import Label, PullRequest, Milestone,Issue
from versioningapp.models import Branch, Repository
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

# User init consts
USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'

# Pull Request init consts
PULL_REQUEST_1_TITLE = 'feature[pull-request]: crud'
PULL_REQUEST_2_TITLE = 'test[pull-request]: progresstrackapp'
PULL_REQUEST_3_TITLE = 'feature[grammar]: init grammar'


# INFO: Do not change some values without a very good testing, because a lot of test cases are checked by those values
def initialize_db_with_test_data():
    # Create users
    user1 = User.objects.create_user(username=USER1_USERNAME, password=USER1_PASSWORD,first_name=USER1_FIRST_NAME,last_name=USER1_LAST_NAME,email=USER1_EMAIL)
    user1.save()

    # Create repositories
    repository1 = Repository.objects.create(author=user1, name='RepoUKS')
    repository2 = Repository.objects.create(author=user1, name='RepoJSZD')
    
    repository1.save()
    repository2.save()

    # Create branches
    branch1 = Branch.objects.create(repository=repository1, name='main')
    branch2 = Branch.objects.create(repository=repository1, name='develop')
    branch3 = Branch.objects.create(repository=repository2, name='main')
    branch4 = Branch.objects.create(repository=repository2, name='develop')

    branch1.save()
    branch2.save()
    branch3.save()
    branch4.save()

    # Create pull requests
    pull_request1 = PullRequest.objects.create(author=user1, title=PULL_REQUEST_1_TITLE, repository=repository1, base_branch=branch1.name, compare_branch=branch2.name, creation_date=timezone.now())
    pull_request2 = PullRequest.objects.create(author=user1, title=PULL_REQUEST_2_TITLE, repository=repository1, base_branch=branch1.name, compare_branch=branch2.name, creation_date=timezone.now())
    pull_request3 = PullRequest.objects.create(author=user1, title=PULL_REQUEST_3_TITLE, repository=repository2, base_branch=branch3.name, compare_branch=branch4.name, creation_date=timezone.now())
    
    pull_request1.save()
    pull_request2.save()
    pull_request3.save()

    # Create labels
    label1 = Label.objects.create(name='label1', decription='desc1', color='red', repository=repository1)
    label2 = Label.objects.create(name='label2', decription='desc2', color='blue',repository=repository1)

    label1.save()
    label2.save()

   
    #Create issues
    labelsAll=[label1,label2]
    assignessAll=[user1]
    issue1 = Issue.objects.create(title='issue1',creation_date='2022-01-22 22:05:48.078+01',is_opened=True,author=user1,repository=repository1)
    issue2 = Issue.objects.create(title='issue2',creation_date='2022-02-22 22:05:48.078+01',is_opened=True,author=user1,repository=repository1)
    issue3=Issue.objects.create(title='issue3',creation_date='2022-02-22 22:05:48.078+01',is_opened=True,author=user1,repository=repository1)
    issue3.labels.set(labelsAll)
    issue3.assigness.set(assignessAll)

    issue1.save()
    issue2.save()
    issue3.save()

    #Create milestones
    issuesAll=[issue1,issue3]
    milestone1 = Milestone.objects.create(title='milestone1',description='desc1',due_date='2022-01-29 01:00:00+01',repository=repository1)
    milestone2 = Milestone.objects.create(title='milestone2',description='desc2',due_date='2022-03-29 01:00:00+01',repository=repository1)
    milestone3 = Milestone.objects.create(title='milestone3',description='desc3',due_date='2022-03-29 01:00:00+01',repository=repository1)
    milestone3.issues.set(issuesAll)

    milestone1.save()
    milestone2.save()
    milestone3.save()


def get_label(index=0):
    return Label.objects.all()[index]

def get_pull_request(index=0):
    return PullRequest.objects.all()[index]

def get_milestone(index=0):
    return Milestone.objects.all()[index]

def get_issue(index=0):
    return Issue.objects.all()[index]

class TestLabelModel(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_label_name(self):
        label = get_label()
        verbose_name = label._meta.get_field('name').verbose_name
        self.assertEquals(verbose_name, 'name')

    def test_label_name_max_length(self):
        label = get_label()
        max_length = label._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

    def test_color_name(self):
        label = get_label()
        verbose_name = label._meta.get_field('color').verbose_name
        self.assertEquals(verbose_name, 'color')

    def test_label_color_max_length(self):
        label = get_label()
        max_length = label._meta.get_field('color').max_length
        self.assertEquals(max_length, 200)

    def test_label_decription_name(self):
        label = get_label()
        verbose_name = label._meta.get_field('decription').verbose_name
        self.assertEquals(verbose_name, 'decription')

    def test_label_decription_max_length(self):
        label = get_label()
        max_length = label._meta.get_field('decription').max_length
        self.assertEquals(max_length, 200)


class TestPullRequestModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_pr_title_name(self):
        pull_request = get_pull_request()
        verbose_name = pull_request._meta.get_field('title').verbose_name
        self.assertEquals(verbose_name, 'title')

    def test_pr_title_max_length(self):
        pull_request = get_pull_request()
        max_length = pull_request._meta.get_field('title').max_length
        self.assertEquals(max_length, 200)

    def test_two_pr_from_same_repository(self):
        pr = get_pull_request()
        pr1 = get_pull_request(1)
        self.assertEqual(pr.repository, pr1.repository)

    def test_two_pr_from_different_repositories(self):
        pr = get_pull_request()
        pr2 = get_pull_request(2)
        self.assertNotEqual(pr.repository, pr2.repository)

    def test_pr_compare_and_base_branch_names(self):
        pr = get_pull_request()
        self.assertNotEqual(pr.base_branch, pr.compare_branch)

    def test_pr_author_username(self):
        pr = get_pull_request()
        self.assertEqual(pr.author.username, USER1_USERNAME)
    
    def test_default_pr_is_able_to_merge(self):
        pr = get_pull_request()
        self.assertFalse(pr.is_able_to_merge)

    def test_default_pr_is_merged(self):
        pr = get_pull_request()
        self.assertFalse(pr.is_merged)
    
    def test_default_pr_is_approved(self):
        pr = get_pull_request()
        self.assertFalse(pr.is_approved)

    def test_empty_pr_issues(self):
        pr = get_pull_request()
        self.assertEqual(pr.issues.count(),0)

    def test_empty_pr_milestones(self):
        pr = get_pull_request()
        self.assertEqual(pr.milestones.count(),0)

    def test_empty_pr_labels(self):
        pr = get_pull_request()
        self.assertEqual(pr.labels.count(),0)

    def test_empty_pr_reviewes(self):
        pr = get_pull_request()
        self.assertEqual(pr.reviewes.count(),0)

    def test_empty_pr_assigness(self):
        pr = get_pull_request()
        self.assertEqual(pr.assigness.count(),0)

# TODO: Add test cases for the issue !!
class TestIssueModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()
    
    def test_issue_name(self):
        issue = get_issue()
        verbose_name = issue._meta.get_field('title').verbose_name
        self.assertEquals(verbose_name, 'title')

    def test_issue_name_max_length(self):
        issue = get_issue()
        max_length = issue._meta.get_field('title').max_length
        self.assertEquals(max_length, 200)
    
    def test_issue_author_username(self):
        issue = get_issue()
        self.assertEqual(issue.author.username, USER1_USERNAME)
    
    def test_empty_issue_assigness(self):
        issue = get_issue()
        self.assertEqual(issue.assigness.count(),0)
    
    def test_not_empty_issue_assigness(self):
        issue = get_issue(2)
        self.assertEqual(issue.assigness.count(),1)

    def test_empty_issue_labels(self):
        issue = get_issue()
        self.assertEqual(issue.labels.count(),0)

    def test_not_empty_issue_labels(self):
        issue = get_issue(2)
        self.assertEqual(issue.labels.count(),2)


class TestMilestoneModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_milestone_name(self):
        milestone = get_milestone()
        verbose_name = milestone._meta.get_field('title').verbose_name
        self.assertEquals(verbose_name, 'title')
    
    def test_milestone_name_max_length(self):
        milestone = get_milestone()
        max_length = milestone._meta.get_field('title').max_length
        self.assertEquals(max_length, 200)

    def test_description_name(self):
        milestone = get_milestone()
        verbose_name = milestone._meta.get_field('description').verbose_name
        self.assertEquals(verbose_name, 'description')
    
    def test_description_name_max_length(self):
        milestone = get_milestone()
        max_length = milestone._meta.get_field('description').max_length
        self.assertEquals(max_length, 200)

    def test_empty_milestone_issues(self):
        milestone = get_milestone()
        self.assertEqual(milestone.issues.count(),0)

    def test_not_empty_milestone_issues(self):
        milestone = get_milestone(2)
        self.assertEqual(milestone.issues.count(),2)


   

    

    
