from django.db import models
from versioningapp.models import Branch

class Label(models.Model):  
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    decription = models.CharField(max_length=200)
    def __str__(self):
         return 'Name of object: ' + self.name 
class Issue(models.Model):  
    title= models.CharField(max_length=200)
    creation_date= models.DateTimeField('date of creation')
    is_opened = models.BooleanField(default=False)
    labels = models.ManyToManyField(Label, blank=True)
    def __str__(self):
        return 'Title of object: ' + self.title
class Milestone(models.Model):  
    title = models.CharField(max_length=200)
    due_date = models.DateTimeField('due date')
    description = models.CharField(max_length=200)
    issues = models.ManyToManyField(Issue, blank=True)
    def __str__(self):
        return 'Title of object: ' + self.title       
          
class PullRequest(models.Model):  
    base_branch =  models.ForeignKey(to=Branch, null=False, on_delete=models.CASCADE,related_name='base_branchs')
    compare_branch =  models.ForeignKey(to=Branch, null=False, on_delete=models.CASCADE,related_name='compare_branchs')
    is_able_to_merge = models.BooleanField(default=False)
    is_merged = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    creation_date = models.DateTimeField('creation date')
    title = models.CharField(max_length=200)
    issues = models.ManyToManyField(Issue, blank=True)
    milestones = models.ManyToManyField(Milestone, blank=True)
    labels = models.ManyToManyField(Label, blank=True)
    def __str__(self):
        return 'Title of object: ' + self.title    

# Create your models here.
