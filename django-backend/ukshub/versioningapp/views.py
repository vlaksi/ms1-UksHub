import json
import os
import time
from datetime import datetime

from django.db.models import Q
from ast import Return
from django.shortcuts import render
from django.http import Http404
from django.contrib.auth.models import User

from rest_framework import generics, permissions,filters
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import CollaborationType, Branch, Commit, Repository, Collaboration
from .serializers import CollaborationTypeSerializer, CollaboratorSerializer, BranchSerializer, CommitSerializer, GitServerBranchSerializer, GitServerCommitSerializer, RepositorySerializer, CollaborationSerializer
from .dtos import CollaboratorDto, GitServerBranchDto, GitServerCommitDto

from git import Repo

def get_data_from_tree_blobs(tree, data_array):
    charset='ascii'
    for blob in tree.blobs:
        print("\n")
        data = blob.data_stream.read()
        path = blob.path
        print(path)
        print(data.decode(charset))
        new_obj = {
            "name": path,
            "value": data
        }
        data_array.append(new_obj)

    return data_array

def get_data_from_tree_trees(tree, data):
    trees = tree.trees # returns a list of trees
    print("trees")
    print(trees)
    for tree in trees:
        data = get_data_from_tree_blobs(tree, data)
        print("\t\ttree.trees")
        print(tree.trees)
        if(len(tree.trees) > 0):
            print("vise od jednog")
            data = get_data_from_tree_trees(tree, data)

    return data

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
def search_all_repositories_of_user(request, user_id, searchword):
    criterion1 = Q(author_id=user_id)
    criterion2 = Q(name__contains=searchword)
    repositories= Repository.objects.filter(criterion1 & criterion2)
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
    returnBranches = []
    try:
        repo = Repo(os.getenv('GIT_SERVER_PATH')+str(repository.author.id)+"/"+repository.name+'.git')
        branches = repo.branches
        for branch in branches:
            print(branch)
            returnBranches.append(GitServerBranchDto.create( branch.name ))
    except:
        returnBranches.append(GitServerBranchDto.create( "master" ))

    if len(returnBranches) == 0 :
        returnBranches.append(GitServerBranchDto.create( "master" ))
    serializers = GitServerBranchSerializer(returnBranches, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def branch_content(request, repo_id, name):
    repository = Repository.objects.get(id = repo_id)
    data = []
    try:
        print("\n\n\n\nusli u branch_content")
        repo = Repo(os.getenv('GIT_SERVER_PATH')+str(repository.author.id)+"/"+repository.name+'.git')

        print("\n\tblobs")
        blobs = repo.tree(name).blobs # returns a list of blobs
        data = get_data_from_tree_blobs(repo.tree(name), data)
        print("data")
            
        tree = repo.tree(name)
        data = get_data_from_tree_trees(tree, data)
      
        print("\n\nKRAJ\n")
    except:
        return Response({"message": "Error during reading repos"})

    return Response(data)
    

@api_view(['GET'])
def branch_last_commit(request, repository_id, name):
    print("\n\nrepository_id")
    print(repository_id)
    repository = Repository.objects.get(id = repository_id)
    # branch = Branch.objects.get(name = name, repository_id = repository.id)
    commits = []
    try:
        repo = Repo(os.getenv('GIT_SERVER_PATH')+str(repository.author.id)+"/"+repository.name+'.git')
        commits = list(repo.iter_commits(name))
    except:
        return Response({})
    returnCommits = []
    commited = datetime.fromtimestamp(commits[0].committed_date)
    difference = datetime.fromtimestamp(int(time.time())) - commited
    diff = divmod(difference.total_seconds(), 31536000)[0]
    commited_date = str(int(diff)) + " years ago"
    if diff == 0 :
        diff = difference.days
        commited_date = str(int(diff)) + " days ago"
    if diff == 0 :
        diff = divmod(difference.total_seconds(), 3600)[0]
        commited_date = str(int(diff)) + " hours ago"
    if diff == 0 :
        diff = divmod(difference.total_seconds(), 60)[0]
        commited_date = str(int(diff)) + " minutes ago"
    if diff == 0 :
        diff = difference.seconds
        commited_date = str(int(diff)) + " seconds ago"
    returnCommits.append(GitServerCommitDto.create(commits[0], commited_date, commits[0].author, commits[0].summary))
    serializers = GitServerCommitSerializer(returnCommits, many=True)
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
def branch_commits(request, repository_id, name):
    repository = Repository.objects.get(id = repository_id)
    # branch = Branch.objects.get(name = name, repository_id = repository.id)
    commits = []
    try:
        repo = Repo(os.getenv('GIT_SERVER_PATH')+str(repository.author.id)+"/"+repository.name+'.git')
        commits = list(repo.iter_commits(name))
    except:
        return Response({})

    now = datetime.fromtimestamp(int(time.time()))
    returnCommits = []
    for commit in commits:
        commited = datetime.fromtimestamp(commit.committed_date)
        difference = now - commited
        diff = divmod(difference.total_seconds(), 31536000)[0]
        commited_date = str(int(diff)) + " years ago"
        if diff == 0 :
            diff = difference.days
            commited_date = str(int(diff)) + " days ago"
        if diff == 0 :
            diff = divmod(difference.total_seconds(), 3600)[0]
            commited_date = str(int(diff)) + " hours ago"
        if diff == 0 :
            diff = divmod(difference.total_seconds(), 60)[0]
            commited_date = str(int(diff)) + " minutes ago"
        if diff == 0 :
            diff = difference.seconds
            commited_date = str(int(diff)) + " seconds ago"
        returnCommits.append(GitServerCommitDto.create(commit, commited_date, commit.author, commit.summary))
    serializers = GitServerCommitSerializer(returnCommits, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def main_branch_commits(request, repo_id):
    repository = Repository.objects.get(id = repo_id)
    commits = []
    returnCommits = []
    try:
        repo = Repo(os.getenv('GIT_SERVER_PATH')+str(repository.author.id)+"/"+repository.name+'.git')
        commits = repo.iter_commits('master')
        for commit in commits:
            returnCommits.append(GitServerCommitDto.create(commit, datetime.fromtimestamp(commit.committed_date), commit.author, commit.message))
    except:
        return Response({})
        
    serializers = GitServerCommitSerializer(returnCommits, many=True)
    # repositoribranches = repository.repositoryBranches.all()
    # for repositoribranch in repositoribranches:
    #     print(repositoribranches)
    #     if(repositoribranch.name == 'master'):
    #           branch = Branch.objects.get(id = repositoribranch.pk)
    #           commits = branch.commits
    #           serializers = CommitSerializer(commits, many=True)

    return Response(serializers.data)