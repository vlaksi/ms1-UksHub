from django.urls import path
from . import views

urlpatterns = [   
    path('repositorys/', views.RepositoryList.as_view()),
    path('repositorys/<int:pk>', views.RepositoryDetail.as_view()),
]