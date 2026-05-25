from django.urls import path
from .views import todos_api, todo_detail_api

urlpatterns = [
    path("api/todos/", todos_api),
    path("api/todos/<int:pk>/", todo_detail_api),
]