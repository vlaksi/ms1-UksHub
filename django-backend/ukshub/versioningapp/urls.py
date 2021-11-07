from django.urls import path
from . import views

urlpatterns = [   
    path('repositorys/', views.RepositoryList.as_view()),
    path('repositorys/<int:pk>', views.RepositoryDetail.as_view()),
    path('branchs/', views.BranchList.as_view()),
    path('branchs/<int:pk>', views.BranchDetail.as_view()),
    path('commits/', views.CommitList.as_view()),
    path('commits/<int:pk>', views.CommitDetail.as_view()),
    path('folders/', views.FolderList.as_view()),
    path('folders/<int:pk>', views.FolderDetail.as_view()),
    path('files/', views.FileList.as_view()),
    path('files/<int:pk>', views.FileDetail.as_view()), 
]