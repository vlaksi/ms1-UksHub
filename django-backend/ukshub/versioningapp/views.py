from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Repository
from .serializers import RepositorySerializer

class RepositoryList(generics.ListCreateAPIView):
    queryset = Repository.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RepositorySerializer

class RepositoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Repository.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RepositorySerializer

