from django.urls import path
from . import views

urlpatterns = [   
    path('repositories/', views.RepositoryList.as_view()),
    path('repositories/<int:pk>', views.RepositoryDetail.as_view()),
    path('collaborations/', views.CollaborationList.as_view()),
    path('collaborations/<int:pk>', views.CollaborationDetail.as_view()),
    path('visits/', views.VisitList.as_view()),
    path('visits/<int:pk>', views.VisitDetail.as_view()),
    path('collaboration/types/', views.collaboration_types, name="collaboration-types"),
    path('branchs/', views.BranchList.as_view()),
    path('branchs/<int:pk>', views.BranchDetail.as_view()),
    path('commits/', views.CommitList.as_view()),
    path('commits/<int:pk>', views.CommitDetail.as_view()),
    path('users/<int:user_id>/repositories',views.all_repositories_by_user,name="all-repositories"),
    path('users/<int:user_id>/repositories/<str:searchword>',views.search_all_repositories_of_user, name="search_all_repositories_of_user"),
    path('repository/<int:pk>/branches/', views.repository_branches, name="repository-branches"), 
    path('repository/<int:repo_id>/collaborators/', views.repository_collaborators, name="repository-collaborators"),
    path('repository/<int:repo_id>/collaborators/<str:searchword>', views.search_repository_collaborators, name="search_repository_collaborators"),
    path('branch/<int:pk>/commit/', views.branch_last_commit, name="branch-last-commit"), 
    path('branch/<int:pk>/commits/', views.branch_commits, name="branch-commits"),\
    path('branch/<int:repository_id>/<str:name>/commit/', views.branch_last_commit, name="branch-last-commit"), 
    path('branch/<int:repository_id>/<str:name>/commits/', views.branch_commits, name="branch-commits"),
    path('mainbranch/<int:repo_id>/commits/', views.main_branch_commits, name="main-branch-commits"), 
]