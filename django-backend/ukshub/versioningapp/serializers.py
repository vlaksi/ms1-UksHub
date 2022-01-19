from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Branch, Commit, File, Folder, Repository, Collaboration, CollaborationType
from .dtos import CollaboratorDto

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
        repository = Repository.objects.create( author=author, name=name, description=description)
        repository.save()

        # Create default main branch of this repository & update default branch of the repository
        default_branch = Branch.objects.create(name='main', repository=repository)
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
        fields = [ "pk", "repository", "child_branchs", "parent_branch", "files" , "folders", "name", "commits"]
        extra_kwargs = {
             "repository": {"required": False},
             "child_branchs": {"required": False},
             "parent_branch": {"required": False},
             "files": {"required": False},
             "folders": {"required": False},
             "commits": {"required": False},   
        }
        
class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = [ "pk", "autor", "files", "message" , "creation_date", "comments"]
        extra_kwargs = {
             "comments": {"required": False},
        }

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = [ "pk", "parent_directory", "sub_directories", "files" , "name", "last_change"]
        extra_kwargs = {
             "parent_directory": {"required": False},
             "sub_directories": {"required": False},
             "files": {"required": False},
        }

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = [ "pk", "name", "path", "creation_date"]
