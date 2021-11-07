from django.urls import path
from . import views

urlpatterns = [   
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>', views.CommentDetail.as_view()),
    path('reactions/', views.ReactionList.as_view()),
    path('reactions/<int:pk>', views.ReactionDetail.as_view()),
    path('actions/', views.ActionList.as_view()),
    path('actions/<int:pk>', views.ActionDetail.as_view()),
    path('reactiontypes/', views.ReactionTypeList.as_view()),
    path('reactiontypes/<int:pk>', views.ReactionTypeDetail.as_view()),
    path('actiontypes/', views.ActionTypeList.as_view()),
    path('actiontypes/<int:pk>', views.ActionTypeDetail.as_view()),
]