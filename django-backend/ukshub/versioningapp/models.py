from django.db import models
from authentication.models import UserAccount
from useractivityapp.models import Action
    
class Commit(models.Model):
    autor = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=True, related_name='created_commits')
    message = models.CharField(max_length=200)
    hash = models.CharField('hash', max_length=1000)
    creation_date = models.DateTimeField('date of creation')
    def __str__(self):
        return 'Name of object: ' + self.message

class Branch(models.Model):
    repository = models.ForeignKey('Repository', on_delete=models.CASCADE, blank=True, related_name = "repositoryBranches")
    name = models.CharField(max_length=200)
    commits = models.ManyToManyField(Commit, blank=True)
    def __str__(self):
        return 'Name of object: ' + self.name

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