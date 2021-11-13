from django.db.models import query
from django.shortcuts import render
from rest_framework import generics, serializers, permissions
from django.contrib.auth.models import User
from .models import Action, ActionType, Comment, Reaction, ReactionType
from .serializers import UserSerializer, ActionSerializer, ActionTypeSerializer, CommentSerializer, ReactionSerializer, ReactionTypeSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer

class ReactionList(generics.ListCreateAPIView):
    queryset = Reaction.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReactionSerializer

class ReactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reaction.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReactionSerializer

class ActionList(generics.ListCreateAPIView):
    queryset = Action.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActionSerializer

class ActionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Action.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActionSerializer

class ActionTypeList(generics.ListCreateAPIView):
    queryset = ActionType.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActionTypeSerializer

class ActionTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ActionType.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActionTypeSerializer

class ReactionTypeList(generics.ListCreateAPIView):
    queryset = ReactionType.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReactionTypeSerializer

class ReactionTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ReactionType.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReactionTypeSerializer