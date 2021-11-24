from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Action, Comment, Reaction, ReactionType, ActionType

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "pk", "password", "username", "email" ]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [ "pk", "message", "creation_date", "author" , "reaction"]
        extra_kwargs = {
             "reaction": {"required": False},
        }

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = [ "pk", "author", "type" ]

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = [ "pk", "author", "repository", "action_type", "new_forked_repository" ]

class ReactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReactionType
        fields = [ "pk", "name" ]

class ActionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActionType
        fields = [ "pk", "name" ]