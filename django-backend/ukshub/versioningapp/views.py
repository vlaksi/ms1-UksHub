from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User
from .models import Branch, Commit, File, Folder, Repository, Collaboration
from .serializers import UserSerializer, BranchSerializer, CommitSerializer, FileSerializer, FolderSerializer, RepositorySerializer, CollaborationSerializer

class RepositoryList(generics.ListCreateAPIView):
    queryset = Repository.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RepositorySerializer

class RepositoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Repository.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RepositorySerializer

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

class FolderList(generics.ListCreateAPIView):
    queryset = Folder.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FolderSerializer

class FolderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folder.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FolderSerializer

class FileList(generics.ListCreateAPIView):
    queryset = File.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FileSerializer

class FileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FileSerializer


@api_view(['GET'])
def repository_branches(request, pk):
    repository = Repository.objects.get(id = pk)
    repositories = repository.repositoryBranches.all()
    serializers = BranchSerializer(repositories, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def repository_collaborators(request, repository_id):
    # For the Repository PK, getAll collaborators
    collaborators = []
    collaborations = Collaboration.objects.filter(repository_id = repository_id)
    print('\n\n')
    for collaboration in collaborations:
        print(collaboration)
        newUser = User.objects.get(username=collaboration.collaborator)
        collaborators.append(newUser)
    print(collaborators)
    print('\n\n')
    # serializers = CollaborationSerializer(collaborations, many=True)
    serializers = UserSerializer(collaborators, many=True)
    return Response(serializers.data)

