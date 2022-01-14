from django.db.models import fields
from rest_framework import serializers
from .models import Action, Comment, Reaction, ReactionType, ActionType
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "pk", "username", "email", "password", "first_name", "last_name", "is_superuser", "is_staff"]

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.password = make_password(validated_data.get('password', instance.password))
        instance.save()
        return instance

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)

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
