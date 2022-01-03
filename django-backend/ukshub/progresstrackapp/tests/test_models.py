from django.utils import timezone
from django.contrib.auth.models import User
from django.test import TestCase
from ..models import Label, PullRequest
from versioningapp.models import Branch, Repository
from django.contrib.auth import get_user_model
User = get_user_model()

USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'

def initialize_db_with_test_data():
    # Create users
    user1 = User.objects.create_user(username=USER1_USERNAME, password=USER1_PASSWORD,first_name=USER1_FIRST_NAME,last_name=USER1_LAST_NAME,email=USER1_EMAIL)
    user1.save()

    # Create repositories
    repository1 = Repository.objects.create(author=user1, name='RepoUKS')
    repository1.save()

    # Create branches
    branch1 = Branch.objects.create(repository=repository1, name='main')
    branch2 = Branch.objects.create(repository=repository1, name='develop')
    
    branch1.save()
    branch2.save()

    # Create pull requests
    pull_request1 = PullRequest.objects.create(title='feature[pull-request]: crud', repository=repository1, base_branch=branch1, compare_branch=branch2, creation_date=timezone.now())
    pull_request2 = PullRequest.objects.create(title='test[pull-request]: progresstrackapp', repository=repository1, base_branch=branch1, compare_branch=branch2, creation_date=timezone.now())
    
    pull_request1.save()
    pull_request2.save()

    # Create labels
    label1 = Label.objects.create(name='label1', decription='desc1', color='red')
    label2 = Label.objects.create(name='label2', decription='desc2', color='blue')

    label1.save()
    label2.save()

def get_label(index=0):
    return Label.objects.all()[index]

def get_pull_request(index=0):
    return PullRequest.objects.all()[index]

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
        max_length = label._meta.get_field('decription').max_length
        self.assertEquals(max_length, 200)

    def test_decription_name(self):
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


# TODO: Add test cases for the issue !!
class TestIssueModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()
        # extend init function with data needed for the Issue


# TODO: Add test cases for the Milestone !!
class TestMilestoneModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()
        # extend init function with data needed for the Milestone


    