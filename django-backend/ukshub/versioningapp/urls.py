from django.urls import path
from . import views

urlpatterns = [   
    path('repositorys/', views.RepositoryList.as_view()),
    path('repositorys/<int:pk>', views.RepositoryDetail.as_view()),
    path('collaborations/', views.CollaborationList.as_view()),
    path('collaborations/<int:pk>', views.CollaborationDetail.as_view()),
    path('collaboration/types/', views.collaboration_types, name="collaboration-types"),
    path('branchs/', views.BranchList.as_view()),
    path('branchs/<int:pk>', views.BranchDetail.as_view()),
    path('commits/', views.CommitList.as_view()),
    path('commits/<int:pk>', views.CommitDetail.as_view()),
    path('folders/', views.FolderList.as_view()),
    path('folders/<int:pk>', views.FolderDetail.as_view()),
    path('files/', views.FileList.as_view()),
    path('files/<int:pk>', views.FileDetail.as_view()), 
    path('repository/<int:pk>/branches/', views.repository_branches, name="repository-branches"), 
    path('repository/<int:repo_id>/collaborators/', views.repository_collaborators, name="repository-collaborators"), 
]