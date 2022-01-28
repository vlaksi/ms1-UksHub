from rest_framework import serializers
from .models import Issue, Label, Milestone, PullRequest

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = [ "pk", "name", "color", "decription","repository" ]


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = [ "pk", "repository", "author", "assigness","comments", "title","creation_date", "is_opened", "labels" ]
        extra_kwargs = {
             "labels": {"required": False},
             "comments": {"required": False},
        }

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = [ "pk", "title", "due_date", "description","issues","repository","is_opened"]
        extra_kwargs = {
             "issues": {"required": False},
             
        }

class PullRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PullRequest
        fields = [ "pk", "repository", "reviewes", "assigness","base_branch","compare_branch","is_able_to_merge","is_merged","is_approved","creation_date", "title","issues","milestones","labels","comments","author" ]
        extra_kwargs = {
             "reviewes": {"required": False},
             "assigness": {"required": False},
             "issues": {"required": False},
             "milestones": {"required": False},
             "labels": {"required": False},
             "comments": {"required": False},
        }