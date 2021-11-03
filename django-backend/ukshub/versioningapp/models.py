from django.db import models

class Repository(models.Model):
    name= models.CharField(max_length=200)
    description= models.CharField(max_length=200)

class File(models.Model):  
    name= models.CharField(max_length=200)
    path= models.CharField(max_length=200)
    creation_date= models.DateTimeField('date of creation')

class Commit(models.Model):
    files = models.ManyToManyField(File)
    message= models.CharField(max_length=200)
    creation_date= models.DateTimeField('date of creation')
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)

class Branch(models.Model):
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    child_branchs = models.ForeignKey('self', on_delete=models.CASCADE, related_name='child_branches')
    parent_branch = models.ForeignKey('self', on_delete=models.CASCADE)
    files = models.ManyToManyField(File)
    name= models.CharField(max_length=200)
    commits = models.ManyToManyField(Commit)

class Folder(models.Model):
    parent_directory = models.ForeignKey('self', on_delete=models.CASCADE, related_name='parent_directory')
    sub_folders = models.ForeignKey('self', on_delete=models.CASCADE, related_name='sub_folders')
    branch = models.ManyToManyField(Branch)
    files = models.ManyToManyField(File)
    name= models.CharField(max_length=200)
    last_change= models.DateTimeField('last change')