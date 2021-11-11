from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Branch, Commit, File, Folder, Repository
from .serializers import BranchSerializer, CommitSerializer, FileSerializer, FolderSerializer, RepositorySerializer

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