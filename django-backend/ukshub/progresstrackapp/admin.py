from django.contrib import admin

from .models import Issue,Label,Milestone,PullRequest

admin.site.register(Issue)
admin.site.register(Label)
admin.site.register(Milestone)
admin.site.register(PullRequest)
# Register your models here.
