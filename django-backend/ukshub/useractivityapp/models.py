from django.db import models
from django.db.models import UniqueConstraint
from authentication.models import UserAccount

class ActionType(models.Model):  
    name = models.CharField(max_length=200)
    def __str__(self):
        return 'Name of object: ' + self.name

class ReactionType(models.Model):  
    name= models.CharField(max_length=200)
    def __str__(self):
        return 'Name of object: ' + self.name

class Action(models.Model): 
    author = models.ForeignKey(to=UserAccount, null=False, on_delete=models.CASCADE) 
    repository = models.ForeignKey('versioningapp.Repository', on_delete=models.CASCADE, related_name = "repositoryActions")
    action_type =  models.CharField(max_length=200)
    new_forked_repository = models.ForeignKey('versioningapp.Repository', on_delete=models.CASCADE, related_name = "actionNewForkedRepository", null=True)
    class Meta:
        constraints = [
            UniqueConstraint(fields = ['author', 'repository', 'action_type'], name = 'unique_action_constraint')
        ]
    def __str__(self):
        return 'Type of Action: ' + self.action_type

class Reaction(models.Model):  
    author = models.ForeignKey(to=UserAccount, null=False, on_delete=models.CASCADE,related_name='reactions_created') 
    comment = models.ForeignKey(to='Comment', null=False, on_delete=models.CASCADE) 
    type = models.CharField(max_length=200)
    
        
class Comment(models.Model):  
    author = models.ForeignKey(to=UserAccount, null=False, on_delete=models.CASCADE,related_name='comment_created') 
    message = models.CharField(max_length=200)
    creation_date = models.DateTimeField('date of creation')
    issue = models.ForeignKey(to='progresstrackapp.Issue',null=True, blank=True, on_delete=models.CASCADE) 
    pull_request = models.ForeignKey(to='progresstrackapp.PullRequest',null=True,blank=True, on_delete=models.CASCADE) 

