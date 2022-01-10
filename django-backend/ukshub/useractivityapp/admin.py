from django.contrib import admin

from .models import Action,ActionType,Reaction,ReactionType

admin.site.register(Action)
admin.site.register(ActionType)
admin.site.register(Reaction)
admin.site.register(ReactionType)

# Register your models here.
