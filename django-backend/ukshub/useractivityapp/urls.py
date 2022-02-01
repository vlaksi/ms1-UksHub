from django.urls import path
from . import views

urlpatterns = [
    path('manageusers/', views.UserAdminList.as_view()),
    path('manageusers/<int:pk>', views.UserAdminDetail.as_view()),   
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>', views.UserDetail.as_view()),   
    path('users/<int:repo_id>/<str:action_name>/',views.all_users_by_repo_and_action,name="all-users-by-repo-action"),
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>', views.CommentDetail.as_view()),
    path('issue/<int:issue_id>/comments',views.all_comments_by_issue_id,name="all-issue-comments"),
    path('pull_request/<int:pull_request_id>/comments',views.all_comments_by_pull_request_id,name="all-pull-request-comments"),
    path('reactions/', views.ReactionList.as_view()),
    path('reactions/comment/<int:comment_id>', views.all_reactions_by_comment_id,name="all-comment-reactions"),
    path('reactions/<int:pk>', views.ReactionDetail.as_view()),
    path('reactions/comments/<int:comment_id>/user/<int:user_id>/type/<str:type_name>',views.delete_by_comment_and_user_id, name="delete-by-comment-and-user-id"),
    path('actions/', views.ActionList.as_view()),
    path('actions/<int:pk>', views.ActionDetail.as_view()),
    path('action/<str:action_name>/<int:repo_id>/<int:user_id>/',views.action_by_repo_and_user,name="action-by-repo-and-user"),
    path('reactiontypes/', views.ReactionTypeList.as_view()),
    path('reactiontypes/<int:pk>', views.ReactionTypeDetail.as_view()),
    path('actiontypes/', views.ActionTypeList.as_view()),
    path('actiontypes/<int:pk>', views.ActionTypeDetail.as_view()),
]