from django.db import models
from django.contrib.auth.models import User

class ActionType(models.Model):  
    name = models.CharField(max_length=200)
    def __str__(self):
        return 'Name of object: ' + self.name

class ReactionType(models.Model):  
    name= models.CharField(max_length=200)
    def __str__(self):
        return 'Name of object: ' + self.name

class Action(models.Model): 
    author = models.ForeignKey(to=User, null=False, on_delete=models.CASCADE,related_name='action_created') 
    repository = models.ForeignKey('versioningapp.Repository', on_delete=models.CASCADE, related_name = "repositoryActions")
    action_type =  models.ForeignKey(to=ActionType, null=False, on_delete=models.CASCADE)
    def __str__(self):
        return 'Type of Action: ' + self.type.name

class Reaction(models.Model):  
    author = models.ForeignKey(to=User, null=False, on_delete=models.CASCADE,related_name='reactions_created') 
    type =  models.ForeignKey(to=ReactionType, null=False, on_delete=models.CASCADE)
    def __str__(self):
        return 'Type of Reaction: ' + self.type.name
        
class Comment(models.Model):  
    author = models.ForeignKey(to=User, null=False, on_delete=models.CASCADE,related_name='comment_created') 
    reaction = models.ManyToManyField(to=Reaction, blank=True, related_name='comment') 
    message = models.CharField(max_length=200)
    creation_date = models.DateTimeField('date of creation')

