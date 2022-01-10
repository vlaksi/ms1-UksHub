from django.contrib import admin

from .models import Repository,Branch,Commit,File,Folder

admin.site.register(Repository)
admin.site.register(Branch)
admin.site.register(File)
admin.site.register(Folder)
admin.site.register(Commit)
# Register your models here.
