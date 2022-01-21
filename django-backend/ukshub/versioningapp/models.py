from django.db import models
from authentication.models import UserAccount
from useractivityapp.models import Action,Comment
import uuid    

class Branch(models.Model):
    repository = models.ForeignKey('Repository', on_delete=models.CASCADE, blank=True, related_name = "repositoryBranches")
    name = models.CharField(max_length=200)
    def __str__(self):
        return 'Name of object: ' + self.name

class Commit(models.Model):
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=True, related_name='created_commits')
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, blank=True, related_name='branch_commits')
    subject = models.CharField(max_length=200)
    description = models.CharField(max_length=200, blank=True, null=True)
    hash = models.UUIDField(default=uuid.uuid4, editable=False)
    creation_date = models.DateTimeField(auto_now_add=True, blank=True)
    comments = models.ManyToManyField(Comment, blank=True, related_name='commit')
    def __str__(self):
        return 'Name of object: ' + self.hash

class Repository(models.Model):
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=True, null=True)
    actions = models.ManyToManyField(Action, blank=True, related_name='action_of_repositorys')
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200, blank=True)
    default_branch = models.ForeignKey(Branch, on_delete=models.CASCADE, blank=True, null=True, related_name='default_branch')
    forked_from_author = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=True, null=True, related_name='authorRepositoryForkedFrom')
    def __str__(self):
        return 'Name of object: ' + self.name

class CollaborationType(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)

class Collaboration(models.Model):
    collaborator = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=False, null=False)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE, blank=False, null=False, related_name = "repositoryCollaborations")
    collaboration_type = models.ForeignKey(CollaborationType, on_delete=models.CASCADE, blank=False, null=False)