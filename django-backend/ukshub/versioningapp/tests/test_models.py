from django.utils import timezone
from django.test import TestCase

from ..models import Branch, Repository
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

# User init consts
USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'

# Repository init consts
REPOSITORY_1_NAME = "UksHub"
REPOSITORY_2_NAME = "MatHub"

# INFO: Do not change some values without a very good testing, because a lot of test cases are checked by those values
def initialize_db_with_test_data():
    # Create users
    user1 = User.objects.create_user(username=USER1_USERNAME, password=USER1_PASSWORD,first_name=USER1_FIRST_NAME,last_name=USER1_LAST_NAME,email=USER1_EMAIL)
    user1.save()

    # Create repositories
    repository1 = Repository.objects.create(author=user1, name=REPOSITORY_1_NAME)
    repository2 = Repository.objects.create(author=user1, name=REPOSITORY_2_NAME)
    
    repository1.save()
    repository2.save()

def get_repository(index=0):
    return Repository.objects.all()[index]

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