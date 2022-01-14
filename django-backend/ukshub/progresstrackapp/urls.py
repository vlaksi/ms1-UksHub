from django.urls import path
from . import views

urlpatterns = [   
    path('labels/', views.LabelList.as_view()),
    path('labels/<int:pk>', views.LabelDetail.as_view()),
    path('issues/', views.IssueList.as_view()),
    path('issues/<int:pk>', views.IssueDetail.as_view()),
    path('milestones/', views.MilestoneList.as_view()),
    path('milestones/<int:pk>', views.MilestoneDetail.as_view()),
    path('pullrequests/', views.PullRequestList.as_view()),
    path('pullrequests/<int:pk>', views.PullRequestDetail.as_view(), name="pull-request-detail"),
    path('repository/<int:repo_id>/pullrequests',views.all_pull_requests_by_repository_id,name="all-repository-pull-requests")
]