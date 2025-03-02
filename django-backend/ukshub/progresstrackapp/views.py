from django.db.models import query,Q
from django.shortcuts import render
from django.http import Http404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, serializers, permissions, filters

from .models import Issue, Label, Milestone, PullRequest
from .serializers import IssueSerializer, LabelSerializer, MilestoneSerializer, PullRequestSerializer
from authentication.serializers import UserCreateSerializer

class LabelList(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Label.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LabelSerializer

class LabelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Label.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LabelSerializer

class IssueList(generics.ListCreateAPIView):
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)
    queryset = Issue.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = IssueSerializer

class IssueDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
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

@api_view(['GET'])
def all_labels_by_repository_id(request, repo_id):
    labels= Label.objects.filter(repository=repo_id)
    if(len(labels) == 0): raise Http404('No Labels matches the given query.')
    serializers=LabelSerializer(labels,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def all_milestones_by_repository_id(request, repo_id):
    milestones= Milestone.objects.filter(repository=repo_id)
    if(len(milestones) == 0): raise Http404('No Milestones matches the given query.')
    serializers=MilestoneSerializer(milestones,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def all_issues_by_repository_id(request, repo_id):
    issues= Issue.objects.filter(repository=repo_id)
    if(len(issues) == 0): raise Http404('No Issues matches the given query.')
    serializers=IssueSerializer(issues,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def search_all_issues_of_author(request, author_id, searchword):
    criterion1 = Q(author__id=author_id)
    criterion2 = Q(title__contains=searchword)
    issues= Issue.objects.filter(criterion1 & criterion2)
    if(len(issues) == 0): raise Http404('No Issues matches the given query.')
    serializers=IssueSerializer(issues,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def search_all_issues_by_repository_id(request, repo_id, searchword):
    criterion1 = Q(repository=repo_id)
    criterion2 = Q(title__contains=searchword)
    issues= Issue.objects.filter(criterion1 & criterion2)
    if(len(issues) == 0): raise Http404('No Issues matches the given query.')
    serializers=IssueSerializer(issues,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def all_assignes_by_issue_id(request, issue_id):
    issue = Issue.objects.get(id = issue_id)
    assigness = issue.assigness.all()
    serializers = UserCreateSerializer(assigness, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def all_labels_by_issue_id(request, issue_id):
    issue = Issue.objects.get(id = issue_id)
    labels = issue.labels.all()
    serializers = LabelSerializer(labels, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def all_issues_by_milestone_id(request, milestone_id):
    milestone = Milestone.objects.get(id = milestone_id)
    issues = milestone.issues.all()
    serializers = IssueSerializer(issues, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def all_assignes_by_pull_request_id(request, pull_request_id):
    pull_request = PullRequest.objects.get(id = pull_request_id)
    assigness = pull_request.assigness.all()
    serializers = UserCreateSerializer(assigness, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def all_labels_by_pull_request_id(request, pull_request_id):
    pull_request = PullRequest.objects.get(id = pull_request_id)
    labels = pull_request.labels.all()
    serializers = LabelSerializer(labels, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def all_issues_by_pull_request_id(request, pull_request_id):
    pull_request = PullRequest.objects.get(id = pull_request_id)
    issues = pull_request.issues.all()
    serializers = IssueSerializer(issues, many=True)
    return Response(serializers.data)
