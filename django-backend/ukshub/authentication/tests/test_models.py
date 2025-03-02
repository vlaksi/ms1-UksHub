from django.utils import timezone
from django.test import TestCase

from django.contrib.auth.models import User
from ..models import UserAccountManager
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.models import BaseUserManager

# User init consts
USER1_USERNAME = 'user1'
USER1_PASSWORD = 'Ovojejakasifra!'
USER1_FIRST_NAME = 'Ivana'
USER1_LAST_NAME = 'Perisic'
USER1_EMAIL = 'ica@gmail.com'
USER1_IS_SUPERUSER = True
USER1_IS_STAFF = True

USER3_USERNAME = 'user3'
USER3_PASSWORD = 'Ovojejakasifra!'
USER3_FIRST_NAME = 'Milovan'
USER3_LAST_NAME = 'Mikic'
USER3_EMAIL = 'user3@gmail.com'
USER3_IS_SUPERUSER = False
USER3_IS_STAFF = False

USER4_USERNAME = 'mikica'
USER4_PASSWORD = 'Mnogojakasifra123!'
USER4_FIRST_NAME = 'Milan'
USER4_LAST_NAME = 'Mirkovic'
USER4_EMAIL = 'mikiliii@gmail.com'


# INFO: Do not change some values without a very good testing, because a lot of test cases are checked by those values
def initialize_db_with_test_data():
    # Create users
    user1 = User.objects.create_user(username=USER1_USERNAME, password=USER1_PASSWORD,first_name=USER1_FIRST_NAME,last_name=USER1_LAST_NAME,email=USER1_EMAIL, is_superuser=USER1_IS_SUPERUSER, is_staff=USER1_IS_STAFF)
    user3 = User.objects.create_user(username=USER3_USERNAME, password=USER3_PASSWORD,first_name=USER3_FIRST_NAME,last_name=USER3_LAST_NAME,email=USER3_EMAIL, is_superuser=USER3_IS_SUPERUSER, is_staff=USER3_IS_STAFF)
    user1.save()
    user3.save()

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
    
    def test_user_password(self):
        user = get_user()
        verbose_name = user._meta.get_field('password').verbose_name
        self.assertEquals(verbose_name, 'password')

    def test_user_username(self):
        user = get_user()
        verbose_name = user._meta.get_field('username').verbose_name
        self.assertEquals(verbose_name, 'username')

    def test_first_name_max_length(self):
        user = get_user()
        max_length = user._meta.get_field('first_name').max_length
        self.assertEquals(max_length, 255)

    def test_last_name_max_length(self):
        user = get_user()
        max_length = user._meta.get_field('last_name').max_length
        self.assertEquals(max_length, 255)

    def test_username_max_length(self):
        user = get_user()
        max_length = user._meta.get_field('username').max_length
        self.assertEquals(max_length, 255) 
   
    def test_email_max_length(self):
        user = get_user()
        max_length = user._meta.get_field('email').max_length
        self.assertEquals(max_length, 255) 
    
    def test_is_active_default(self):
        user = get_user()
        default = user._meta.get_field('is_active').default
        self.assertEquals(default, True) 
    
    def test_is_staff_default(self):
        user = get_user()
        default = user._meta.get_field('is_staff').default
        self.assertEquals(default, False) 
    
    def test_username_unique(self):
        user = get_user()
        unique = user._meta.get_field('username').unique
        self.assertEquals(unique, True) 
   
    def test_email_unique(self):
        user = get_user()
        unique = user._meta.get_field('email').unique
        self.assertEquals(unique, True) 

class TestUserAccountModelMethods(BaseUserManager):

    def test_create_user(self):
        user = UserAccountManager.create_user(self, username=USER4_USERNAME, first_name=USER4_FIRST_NAME, last_name=USER1_LAST_NAME, email=USER4_EMAIL, password=USER4_PASSWORD)
        uniqueUsername = user._meta.get_field('username').unique
        uniqueEmail = user._meta.get_field('email').unique
        is_staff = user._meta.get_field('is_staff').is_staff
        is_superuser = user._meta.get_field('is_staff').is_superuser
        self.assertEquals(uniqueUsername, True) 
        self.assertEquals(uniqueEmail, True) 
        self.assertEquals(is_staff, False) 
        self.assertEquals(is_superuser, False) 
    
    def test_create_superuser(self):
        user = UserAccountManager.create_user(self, username=USER4_USERNAME, first_name=USER4_FIRST_NAME, last_name=USER1_LAST_NAME, email=USER4_EMAIL, password=USER4_PASSWORD)
        uniqueUsername = user._meta.get_field('username').unique
        uniqueEmail = user._meta.get_field('email').unique
        is_staff = user._meta.get_field('is_staff').is_staff
        is_superuser = user._meta.get_field('is_staff').is_superuser
        self.assertEquals(uniqueUsername, True) 
        self.assertEquals(uniqueEmail, True) 
        self.assertEquals(is_staff, True) 
        self.assertEquals(is_superuser, True) 