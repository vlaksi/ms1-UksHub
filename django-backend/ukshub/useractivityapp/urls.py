from django.urls import path
from . import views

urlpatterns = [   
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>', views.CommentList.as_view()),
]