from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('Users must have an email address')

        user = self.model( username=username, **extra_fields)
    
        user.set_password(password)
        user.is_active = True
        user.save()

        return user
    def create_superuser(self, username, email, password,**extra_fields):
        """
         Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
             email=email,
             username=username,
             password=password,**extra_fields
        )
        user.staff = True
        user.admin = True
        user.is_active = True
        user.save(using=self._db)
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255,unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
 

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email