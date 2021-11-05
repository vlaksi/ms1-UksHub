from django.db import models

class File(models.Model):  
    name= models.CharField(max_length=200)
    path= models.CharField(max_length=200)
    creation_date= models.DateTimeField('date of creation')

class Folder(models.Model):
    parent_directory = models.ForeignKey('self', on_delete=models.CASCADE, related_name='parent_folder', blank=True)
    sub_directories = models.ManyToManyField('self', blank=True)
    files = models.ManyToManyField(File)
    name= models.CharField(max_length=200)
    last_change= models.DateTimeField('last change')
    
class Commit(models.Model):
    files = models.ManyToManyField(File)
    message= models.CharField(max_length=200)
    creation_date= models.DateTimeField('date of creation')

class Branch(models.Model):
    child_branchs = models.ManyToManyField('self')
    parent_branch = models.ForeignKey('self', on_delete=models.CASCADE)
    files = models.ManyToManyField(File)
    folders = models.ManyToManyField(Folder)
    name= models.CharField(max_length=200)
    commits = models.ManyToManyField(Commit)

class Repository(models.Model):
    branches = models.ManyToManyField(Branch)
    name= models.CharField(max_length=200)
    description= models.CharField(max_length=200)


