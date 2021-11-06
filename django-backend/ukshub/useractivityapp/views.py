from django.db.models import query
from django.shortcuts import render
from rest_framework import generics, serializers, permissions
from .models import Comment
from .serializers import CommentSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer