from django.db.models import fields
from rest_framework import serializers
from .models import Repository

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = [ "pk", "author", "members", "actions" , "branches", "name", "description"]
        extra_kwargs = {
             "branches": {"required": False},
             "members": {"required": False},
             "actions": {"required": False},
        }