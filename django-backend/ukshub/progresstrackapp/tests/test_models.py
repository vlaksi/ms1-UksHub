from django.contrib.auth.models import User
from django.test import TestCase
from django.contrib.auth import get_user_model
User = get_user_model()

USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'


def initialize_db_with_test_data():
    user1 = User.objects.create_user(username=USER1_USERNAME, password=USER1_PASSWORD,first_name=USER1_FIRST_NAME,last_name=USER1_LAST_NAME,email=USER1_EMAIL)
    user1.save()

class TestPullRequestModel(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        # Set up data for the whole TestCase
        initialize_db_with_test_data()


    def test_title_pull_request(self):
        assert 1 == 1