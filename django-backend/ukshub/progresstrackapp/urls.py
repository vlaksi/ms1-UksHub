from django.urls import path
from . import views

urlpatterns = [   
    path('labels/', views.LabelList.as_view()),
    path('labels/<int:pk>', views.LabelDetail.as_view()),
    path('issues/', views.IssueList.as_view()),
    path('issues/<int:pk>', views.IssueDetail.as_view()),
    path('issue/<int:issue_id>/assignes', views.all_assignes_by_issue_id,name="all-issue-assignes"),
    path('issue/<int:issue_id>/labels', views.all_labels_by_issue_id,name="all-issue-labels"),
    path('milestones/', views.MilestoneList.as_view()),
    path('milestones/<int:pk>', views.MilestoneDetail.as_view()),
    path('pullrequests/', views.PullRequestList.as_view()),
    path('pullrequests/<int:pk>', views.PullRequestDetail.as_view(), name="pull-request-detail"),
    path('repository/<int:repo_id>/pullrequests',views.all_pull_requests_by_repository_id,name="all-repository-pull-requests"),
    path('repository/<int:repo_id>/labels',views.all_labels_by_repository_id,name="all-repository-labels"),
    path('repository/<int:repo_id>/milestones',views.all_milestones_by_repository_id,name="all-repository-milestones"),
    path('repository/<int:repo_id>/issues',views.all_issues_by_repository_id,name="all-repository-issues")
]