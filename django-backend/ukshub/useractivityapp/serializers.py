from django.db.models import fields
from rest_framework import serializers
from .models import Action, Comment, Reaction, ReactionType, ActionType
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "pk", "password", "first_name", "email" ]

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