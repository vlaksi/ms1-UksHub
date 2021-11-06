from django.db.models import fields
from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [ "pk", "message", "creation_date" ]
        # extra_kwargs = {
        #      "creation_date": {"required": False},
        # }