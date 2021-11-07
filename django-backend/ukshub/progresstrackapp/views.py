from django.db.models import query
from django.shortcuts import render
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