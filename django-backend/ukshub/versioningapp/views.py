from ast import Return
from django.shortcuts import render
from django.http import Http404
from django.contrib.auth.models import User

from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import CollaborationType, Branch, Commit, Repository, Collaboration
from .serializers import CollaborationTypeSerializer, CollaboratorSerializer, BranchSerializer, CommitSerializer, GitServerCommitSerializer, RepositorySerializer, CollaborationSerializer
from .dtos import CollaboratorDto, GitServerCommitDto

from git import Repo
import os


class RepositoryList(generics.ListCreateAPIView):
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
    #TODO: change the code so it works with real data
    # try:
    #     repo = Repo(os.getenv('GIT_SERVER_PATH')+str(repository.author.id)+"/"+repository.name+'.git')
    #     branches = repo.branches
    # except:
    #     return Response({})
    # returnBranches = []

    # for branch in branches:
    #     returnBranches.append(GitServerCommitDto.create(    commit.__hash__, commit.committed_date, commit.author))
    # serializers = GitServerCommitSerializer(returnBranches, many=True)
    # return Response(serializers.data)
    b = repository.repositoryBranches.all()
    serializers = BranchSerializer(b, many=True)
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
def branch_commits(request, pk):
    branch = Branch.objects.get(id = pk)
    repository = Repository.objects.get(id = branch.repository_id)
    try:
        repo = Repo(os.getenv('GIT_SERVER_PATH')+str(repository.author.id)+"/"+repository.name+'.git')
        commits = repo.iter_commits('master')
    except:
        return Response({})
    returnCommits = []
    for commit in commits:
        returnCommits.append(GitServerCommitDto.create(commit.__hash__, commit.committed_date, commit.author))
    serializers = GitServerCommitSerializer(returnCommits, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def main_branch_commits(request, repo_id):
    repository = Repository.objects.get(id = repo_id)
    try:
        repo = Repo(os.getenv('GIT_SERVER_PATH')+str(repository.author.id)+"/"+repository.name+'.git')
        commits = repo.iter_commits('master')
    except:
        return Response({})
    returnCommits = []
    for commit in commits:
        returnCommits.append(GitServerCommitDto.create(commit.__hash__, commit.committed_date, commit.author))
    serializers = GitServerCommitSerializer(returnCommits, many=True)
    # repositoribranches = repository.repositoryBranches.all()
    # for repositoribranch in repositoribranches:
    #     print(repositoribranches)
    #     if(repositoribranch.name == 'master'):
    #           branch = Branch.objects.get(id = repositoribranch.pk)
    #           commits = branch.commits
    #           serializers = CommitSerializer(commits, many=True)

    return Response(serializers.data)