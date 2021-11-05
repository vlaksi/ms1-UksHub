from django.db import models

class File(models.Model):  
    name= models.CharField(max_length=200)
    path= models.CharField(max_length=200)
    creation_date= models.DateTimeField('date of creation')
    def __str__(self):
        return 'Name of object: ' + self.name

class Folder(models.Model):
    parent_directory = models.ForeignKey('self', on_delete=models.CASCADE, related_name='parent_folder', blank=True, null=True)
    sub_directories = models.ManyToManyField('self',blank=True, null=True)
    files = models.ManyToManyField(File, blank=True, null=True)
    name = models.CharField(max_length=200)
    last_change = models.DateTimeField('last change')
    def __str__(self):
        return 'Name of object: ' + self.name
    
class Commit(models.Model):
    files = models.ManyToManyField(File)
    message = models.CharField(max_length=200)
    creation_date = models.DateTimeField('date of creation')
    def __str__(self):
        return 'Name of object: ' + self.message

class Branch(models.Model):
    child_branchs = models.ManyToManyField('self', blank=True, null=True)
    parent_branch = models.ForeignKey('self', on_delete=models.CASCADE,blank=True, null=True)
    files = models.ManyToManyField(File,blank=True, null=True)
    folders = models.ManyToManyField(Folder, blank=True, null=True)
    name = models.CharField(max_length=200)
    commits = models.ManyToManyField(Commit, blank=True, null=True)
    def __str__(self):
        return 'Name of object: ' + self.name

class Repository(models.Model):
    branches = models.ManyToManyField(Branch, blank=True, null=True)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    def __str__(self):
        return 'Name of object: ' + self.name


