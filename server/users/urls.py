from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserList.as_view(), name='users'),
    path('<int:pk>', views.UserDetail.as_view(), name='userDetail')
]
