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
        fields = [ "collaboration_id", "username", "role" ]

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = [ "pk", "author", "members", "actions" , "name", "description", "default_branch"]
        extra_kwargs = {
             "members": {"required": False},
             "actions": {"required": False},
        }

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
