from django.db.models import fields
from rest_framework import serializers
from .models import Branch, Commit, File, Folder, Repository

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = [ "pk", "author", "members", "actions" , "branches", "name", "description"]
        extra_kwargs = {
             "branches": {"required": False},
             "members": {"required": False},
             "actions": {"required": False},
        }

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = [ "pk", "child_branchs", "parent_branch", "files" , "folders", "name", "commits"]
        extra_kwargs = {
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
