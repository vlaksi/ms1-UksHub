from django.contrib import admin

from .models import Repository,Branch,Commit

admin.site.register(Repository)
admin.site.register(Branch)
admin.site.register(Commit)
# Register your models here.
