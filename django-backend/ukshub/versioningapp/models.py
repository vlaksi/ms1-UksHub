from django.db import models
from authentication.models import UserAccount
from useractivityapp.models import Action,Comment

class File(models.Model):  
    name= models.CharField(max_length=200)
    path= models.CharField(max_length=200)
    creation_date= models.DateTimeField('date of creation')
    def __str__(self):
        return 'Name of object: ' + self.name

class Folder(models.Model):
    parent_directory = models.ForeignKey('self', on_delete=models.CASCADE, related_name='parent_folder', blank=True, null=True)
    sub_directories = models.ManyToManyField('self',blank=True)
    files = models.ManyToManyField(File, blank=True)
    name = models.CharField(max_length=200)
    last_change = models.DateTimeField('last change')
    def __str__(self):
        return 'Name of object: ' + self.name
    
class Commit(models.Model):
    autor = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=True, related_name='created_commits')
    files = models.ManyToManyField(File)
    message = models.CharField(max_length=200)
    creation_date = models.DateTimeField('date of creation')
    comments = models.ManyToManyField(Comment,blank=True, related_name='commit')
    def __str__(self):
        return 'Name of object: ' + self.message

class Branch(models.Model):
    repository = models.ForeignKey('Repository', on_delete=models.CASCADE, blank=True, related_name = "repositoryBranches")
    child_branchs = models.ManyToManyField('self', blank=True)
    parent_branch = models.ForeignKey('self', on_delete=models.CASCADE,blank=True, null=True)
    files = models.ManyToManyField(File,blank=True)
    folders = models.ManyToManyField(Folder, blank=True)
    name = models.CharField(max_length=200)
    commits = models.ManyToManyField(Commit, blank=True)
    def __str__(self):
        return 'Name of object: ' + self.name

class Repository(models.Model):
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=True, null=True)
    members = models.ManyToManyField(UserAccount, blank=True, related_name='member_of_repositorys')
    actions = models.ManyToManyField(Action, blank=True, related_name='action_of_repositorys')
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200, blank=True)
    default_branch = models.ForeignKey(Branch, on_delete=models.CASCADE, blank=True, null=True, related_name='default_branch')
    def __str__(self):
        return 'Name of object: ' + self.name

class CollaborationType(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)

class Collaboration(models.Model):
    collaborator = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=False, null=False)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE, blank=False, null=False, related_name = "repositoryCollaborations")
    collaboration_type = models.ForeignKey(CollaborationType, on_delete=models.CASCADE, blank=False, null=False)