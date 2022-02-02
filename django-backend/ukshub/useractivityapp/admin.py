from django.contrib import admin

from .models import Action,ActionType,Reaction,ReactionType, Comment

admin.site.register(Action)
admin.site.register(ActionType)
admin.site.register(Reaction)
admin.site.register(ReactionType)
admin.site.register(Comment)

# Register your models here.
