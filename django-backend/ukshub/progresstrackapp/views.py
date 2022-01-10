from django.db.models import query
from django.shortcuts import render
from django.http import Http404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, serializers, permissions

from .models import Issue, Label, Milestone, PullRequest
from .serializers import IssueSerializer, LabelSerializer, MilestoneSerializer, PullRequestSerializer

class LabelList(generics.ListCreateAPIView):
    queryset = Label.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LabelSerializer

class LabelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Label.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LabelSerializer

class IssueList(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = IssueSerializer

class IssueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = IssueSerializer

class MilestoneList(generics.ListCreateAPIView):
    queryset = Milestone.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MilestoneSerializer

class MilestoneDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Milestone.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MilestoneSerializer

class PullRequestList(generics.ListCreateAPIView):
    queryset = PullRequest.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PullRequestSerializer

class PullRequestDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PullRequest.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PullRequestSerializer

@api_view(['GET'])
def all_pull_requests_by_repository_id(request, repo_id):
    pull_requests= PullRequest.objects.filter(repository=repo_id)
    if(len(pull_requests) == 0): raise Http404('No PullRequest matches the given query.')
    serializers=PullRequestSerializer(pull_requests,many=True)
    return Response(serializers.data)