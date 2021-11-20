from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Action, Comment, Reaction, ReactionType

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
        fields = [ "pk", "author", "type" ]

class ReactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReactionType
        fields = [ "pk", "name", "path_to_icon" ]

class ActionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReactionType
        fields = [ "pk", "name", "path_to_icon" ]