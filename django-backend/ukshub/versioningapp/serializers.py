from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Branch, Commit, Repository, Collaboration, CollaborationType
from .dtos import CollaboratorDto

import pygit2
from pygit2 import init_repository
from git import Repo

User = get_user_model()

class CollaborationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollaborationType
        fields = [ "pk", "name" ]

class CollaboratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollaboratorDto
        fields = [ "collaboration_id", "collaborator_id", "username", "role" ]

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = [ "pk", "author", "actions" , "name", "description", "default_branch", "forked_from_author"]
        extra_kwargs = {
             "members": {"required": False},
             "actions": {"required": False},
        }

    def create(self, validated_data):
        # Create repository
        author = validated_data.get('author')
        name = validated_data.get('name')
        description = validated_data.get('description')
        repo = Repo.init("~/git-server/repos/"+name+'.git', bare=True)
        repository = Repository.objects.create( author=author, name=name, description=description)
        repository.save()

        # Create default main branch of this repository & update default branch of the repository
        default_branch = Branch.objects.create(name='master', repository=repository)
        default_branch.save()
        repository.default_branch=default_branch
        repository.save()

        # Create author of the repository to the collaboration table connected to his repository
        collaboration_type_default = CollaborationType.objects.all()[0]
        collaboration = Collaboration.objects.create(collaboration_type=collaboration_type_default, collaborator=author, repository=repository)
        collaboration.save()

        return repository

class CollaborationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaboration
        fields = [ "pk", "collaborator", "repository", "collaboration_type"]

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = [ "pk", "repository", "name", "commits"]
        extra_kwargs = {
             "repository": {"required": False},
             "commits": {"required": False},   
        }
        
class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = [ "pk", "autor", "hash", "message" , "creation_date", "comments"]
        extra_kwargs = {
             "comments": {"required": False},
        }

