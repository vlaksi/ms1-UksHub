from django.db.models import Q
from django.shortcuts import render
from django.http import Http404
from django.contrib.auth.models import User

from rest_framework import generics, permissions,filters
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import CollaborationType, Branch, Commit, Repository, Collaboration
from .serializers import CollaborationTypeSerializer, CollaboratorSerializer, BranchSerializer, CommitSerializer, RepositorySerializer, CollaborationSerializer
from .dtos import CollaboratorDto

class RepositoryList(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Repository.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = RepositorySerializer

class RepositoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Repository.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RepositorySerializer

class CollaborationList(generics.ListCreateAPIView):
    queryset = Collaboration.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CollaborationSerializer

class CollaborationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collaboration.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CollaborationSerializer

class BranchList(generics.ListCreateAPIView):
    queryset = Branch.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BranchSerializer

class BranchDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Branch.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BranchSerializer

class CommitList(generics.ListCreateAPIView):
    queryset = Commit.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommitSerializer

class CommitDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Commit.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommitSerializer

@api_view(['GET'])
def all_repositories_by_user(request, user_id):
    repositories= Repository.objects.filter(author_id=user_id)
    if(len(repositories) == 0): raise Http404('No repositories matches the given query.')
    serializers=RepositorySerializer(repositories,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def collaboration_types(request):
    collaboration_types = CollaborationType.objects.all()
    serializers = CollaborationTypeSerializer(collaboration_types, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def repository_branches(request, pk):
    repository = Repository.objects.get(id = pk)
    repositories = repository.repositoryBranches.all()
    serializers = BranchSerializer(repositories, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def branch_last_commit(request, pk):
    branch = Branch.objects.get(id = pk)
    commit = branch.commits.last()
    serializers = CommitSerializer(commit, many=True)
    return Response(serializers.data)
    
@api_view(['GET'])
def repository_collaborators(request, repo_id):
    collaborators = []
    collaborations = Collaboration.objects.filter(repository_id = repo_id)
    for collaboration in collaborations:
        collaborators.append(CollaboratorDto.create(collaboration.pk,collaboration.collaborator.pk, collaboration.collaborator.username, collaboration.collaboration_type.name))
    serializers = CollaboratorSerializer(collaborators, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def search_repository_collaborators(request, repo_id, searchword):
    collaborators = []
    criterion1 = Q(repository_id=repo_id)
    criterion2 = Q(collaborator__username__contains=searchword)
    collaborations = Collaboration.objects.filter(criterion1 & criterion2)
    for collaboration in collaborations:
        collaborators.append(CollaboratorDto.create(collaboration.pk,collaboration.collaborator.pk, collaboration.collaborator.username, collaboration.collaboration_type.name))
    serializers = CollaboratorSerializer(collaborators, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def branch_commits(request, pk):
    branch = Branch.objects.get(id = pk)
    commits = branch.commits
    serializers = CommitSerializer(commits, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def main_branch_commits(request, repo_id):
    repository = Repository.objects.get(id = repo_id)
    repositoribranches = repository.repositoryBranches.all()
    for repositoribranch in repositoribranches:
        print(repositoribranches)
        if(repositoribranch.name == 'main'):
              branch = Branch.objects.get(id = repositoribranch.pk)
              commits = branch.commits
              serializers = CommitSerializer(commits, many=True)

    return Response(serializers.data)