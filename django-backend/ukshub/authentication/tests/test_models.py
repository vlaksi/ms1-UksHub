from django.utils import timezone
from django.test import TestCase

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()

# User init consts
USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'


# INFO: Do not change some values without a very good testing, because a lot of test cases are checked by those values
def initialize_db_with_test_data():
    # Create users
    user1 = User.objects.create_user(username=USER1_USERNAME, password=USER1_PASSWORD,first_name=USER1_FIRST_NAME,last_name=USER1_LAST_NAME,email=USER1_EMAIL)
    user1.save()

def get_user(index=0):
    return User.objects.all()[index]

class TestUserAccountModel(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        initialize_db_with_test_data()

    def test_user_first_name(self):
        user = get_user()
        verbose_name = user._meta.get_field('first_name').verbose_name
        self.assertEquals(verbose_name, 'first name')

    def test_user_last_name(self):
            user = get_user()
            verbose_name = user._meta.get_field('last_name').verbose_name
            self.assertEquals(verbose_name, 'last name')

    def test_user_email(self):
        user = get_user()
        verbose_name = user._meta.get_field('email').verbose_name
        self.assertEquals(verbose_name, 'email')
    
