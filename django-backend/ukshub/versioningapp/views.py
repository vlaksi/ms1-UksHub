from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
UserAccount = get_user_model()
from django.core.files.storage import FileSystemStorage

from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import CollaborationType, Branch, Commit, Repository, Collaboration
from .serializers import CollaborationTypeSerializer, CollaboratorSerializer, BranchSerializer, CommitSerializer, RepositorySerializer, CollaborationSerializer
from .dtos import CollaboratorDto

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

    def post(self, request, *args, **kwargs):
        user = UserAccount.objects.get(id = request.data['author'])
        branch = Branch.objects.get(id = request.data['branch'])
        author = user
        branch = branch
        subject = request.data['subject']
        description = request.data['description']
        files = request.data['files']
        # if request.FILES['upload']:
        #     upload = request.FILES['upload']
        #     fss = FileSystemStorage()
        #     file = fss.save(upload.name, upload)
        #     file_url = fss.url(file)
        #     # return render(request, 'main/upload.html', {'file_url': file_url})
        Commit.objects.create(author = author, branch = branch, subject = subject, description = description, files=files)
        return HttpResponse({'message': 'Commit created'}, status=200)

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
    commit = Commit.objects.filter(branch_id = pk)
    if(len(commit) == 0): 
        return Response('Branch has no commit.')
    else :
        myCommit = commit.order_by('-creation_date')[0]
        serializers = CommitSerializer(myCommit, many=False)
        return Response(serializers.data)
    
@api_view(['GET'])
def repository_collaborators(request, repo_id):
    collaborators = []
    collaborations = Collaboration.objects.filter(repository_id = repo_id)
    for collaboration in collaborations:
        collaborators.append(CollaboratorDto.create(collaboration.pk,collaboration.collaborator.pk, collaboration.collaborator.username, collaboration.collaboration_type.name))
    serializers = CollaboratorSerializer(collaborators, many=True)
    return Response(serializers.data)
