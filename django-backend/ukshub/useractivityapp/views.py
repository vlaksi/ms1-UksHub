from django.db.models import query
from django.shortcuts import render
from rest_framework import generics, serializers, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from authentication.models import UserAccount
from .models import Action, ActionType, Comment, Reaction, ReactionType
from .serializers import UserSerializer, ActionSerializer, ActionTypeSerializer, CommentSerializer, ReactionSerializer, ReactionTypeSerializer
from django.http import Http404

class UserAdminList(generics.ListCreateAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserSerializer

class UserAdminDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserSerializer

class UserList(generics.ListCreateAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserAccount.objects.all()
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

@api_view(['GET'])
def all_users_by_repo_and_action(request, repo_id, action_name):
    users = []
    actions = Action.objects.filter(repository_id = repo_id, action_type = action_name)
    for action in actions:
        print(action.author)
        users.append(action.author)
    serializers = UserSerializer(users, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def action_by_repo_and_user(request, action_name, repo_id, user_id):
    try:
        action = Action.objects.get(repository_id = repo_id, action_type = action_name, author_id = user_id)
        serializers = ActionSerializer(action, many=False)
        return Response(serializers.data)
    except Action.DoesNotExist:
        action = None
        return Response({})

@api_view(['GET'])
def all_comments_by_issue_id(request, issue_id):
    comments= Comment.objects.filter(issue=issue_id)
    if(len(comments) == 0): raise Http404('No Comments matches the given query.')
    serializers=CommentSerializer(comments,many=True)
    return Response(serializers.data)
    