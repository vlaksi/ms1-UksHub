from django.utils import timezone
from django.test import TestCase

from ..models import Branch, Repository, CollaborationType, Collaboration
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

# User init consts
USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'

USER2_USERNAME = 'user2'
USER2_PASSWORD = 'Ovojejakasifra!'
USER2_FIRST_NAME = 'Jovana'
USER2_LAST_NAME = 'Perisic'
USER2_EMAIL = 'dragica@gmail.com'

# Repository init consts
REPOSITORY_1_NAME = "UksHub"
REPOSITORY_2_NAME = "MatHub"

# Collaboration types init consts
COLLABORATION_TYPE_OWNER = "owner"
COLLABORATION_TYPE_DEVELOPER= "developer"

# INFO: Do not change some values without a very good testing, because a lot of test cases are checked by those values
def initialize_db_with_test_data():
    # Create users
    user1 = User.objects.create_user(username=USER1_USERNAME, password=USER1_PASSWORD,first_name=USER1_FIRST_NAME,last_name=USER1_LAST_NAME,email=USER1_EMAIL)
    user2 = User.objects.create_user(username=USER2_USERNAME, password=USER2_PASSWORD,first_name=USER2_FIRST_NAME,last_name=USER2_LAST_NAME,email=USER2_EMAIL)
    
    user1.save()
    user2.save()

    # Create repositories
    repository1 = Repository.objects.create(author=user1, name=REPOSITORY_1_NAME)
    repository2 = Repository.objects.create(author=user1, name=REPOSITORY_2_NAME)
    
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

    # Create collaboration types
    collaboration_type_1 = CollaborationType.objects.create(name=COLLABORATION_TYPE_OWNER)
    collaboration_type_2 = CollaborationType.objects.create(name=COLLABORATION_TYPE_DEVELOPER)

    collaboration_type_1.save()
    collaboration_type_2.save()

    # Create collaborations
    collaboration1 = Collaboration.objects.create(collaborator=user1, repository=repository1, collaboration_type=get_collaboration_type())
    collaboration2 = Collaboration.objects.create(collaborator=user2, repository=repository1, collaboration_type=get_collaboration_type(1))
    collaboration3 = Collaboration.objects.create(collaborator=user2, repository=repository2, collaboration_type=get_collaboration_type())

    collaboration1.save()    
    collaboration2.save()    
    collaboration3.save()    

def get_repository(index=0):
    return Repository.objects.all()[index]

def get_collaboration_type(index=0):
    return CollaborationType.objects.all()[index]

def get_collaboration(index=0):
    return Collaboration.objects.all()[index]


class TestRepositoryModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_repository_name(self):
        repository = get_repository()
        verbose_name = repository._meta.get_field('name').verbose_name
        self.assertEquals(verbose_name, 'name')

    def test_repository_name_max_length(self):
        repository = get_repository()
        max_length = repository._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

    def test_repository_description_name(self):
        repository = get_repository()
        verbose_name = repository._meta.get_field('description').verbose_name
        self.assertEquals(verbose_name, 'description')

    def test_repository_description_max_length(self):
        repository = get_repository()
        max_length = repository._meta.get_field('description').max_length
        self.assertEquals(max_length, 200)

    def test_empty_repository_actions(self):
        repository = get_repository()
        self.assertEqual(repository.actions.count(),0)

    def test_repository_author_username(self):
        repository = get_repository()
        self.assertEqual(repository.author.username, USER1_USERNAME)

    def test_repository_default_branch_name(self):
        repository = get_repository()
        self.assertEqual(repository.default_branch, None)
    
    def test_repository_forked_from_author(self):
        repository = get_repository()
        self.assertEqual(repository.forked_from_author, None)

class TestCollaborationTypeModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_collaboration_type_name(self):
        collaboration_type = get_collaboration_type()
        verbose_name = collaboration_type._meta.get_field('name').verbose_name
        self.assertEquals(verbose_name, 'name')

    def test_collaboration_type_name_max_length(self):
        collaboration_type = get_collaboration_type()
        max_length = collaboration_type._meta.get_field('name').max_length
        self.assertEquals(max_length, 200)

    def test_collaboration_type_owner_name(self):
        collaboration_type = get_collaboration_type()
        self.assertEqual(collaboration_type.name, COLLABORATION_TYPE_OWNER)

    def test_collaboration_type_developer_name(self):
        collaboration_type = get_collaboration_type(1)
        self.assertEqual(collaboration_type.name, COLLABORATION_TYPE_DEVELOPER)

class TestCollaborationModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_collaboration_collaborator_username(self):
        collaboration = get_collaboration()
        self.assertEqual(collaboration.collaborator.username, USER1_USERNAME)

    def test_collaboration_repository_name(self):
        collaboration = get_collaboration()
        self.assertEqual(collaboration.repository.name, REPOSITORY_1_NAME)

    def test_collaboration_collaboration_type_owner(self):
        collaboration = get_collaboration()
        self.assertEqual(collaboration.collaboration_type.name, COLLABORATION_TYPE_OWNER)
