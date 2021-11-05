from django.db import models

class ActionType(models.Model):  
    name = models.CharField(max_length=200)
    path_to_icon = models.CharField(max_length=200)
    def __str__(self):
        return 'Name of object: ' + self.name


class ReactionType(models.Model):  
    name= models.CharField(max_length=200)
    path_to_icon= models.CharField(max_length=200)
    def __str__(self):
        return 'Name of object: ' + self.name

class Action(models.Model):  
    type =  models.ForeignKey(to=ActionType, null=False, on_delete=models.CASCADE)
class Reaction(models.Model):  
    type =  models.ForeignKey(to=ReactionType, null=False, on_delete=models.CASCADE)

class Comment(models.Model):  
    message = models.CharField(max_length=200)
    creation_date = models.DateTimeField('date of creation')
# Create your models here.
