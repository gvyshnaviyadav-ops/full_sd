from django.shortcuts import render, redirect, get_object_or_404
from .models import Todo
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Todo

@csrf_exempt
def todos_api(request):
    if request.method == "GET":
        todos = list(Todo.objects.values())
        return JsonResponse(todos, safe=False)

    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title")

        todo = Todo.objects.create(title=title)
        return JsonResponse({"id": todo.id, "title": todo.title})
    


@csrf_exempt
def todo_detail_api(request, pk):
    todo = Todo.objects.get(id=pk)

    if request.method == "PUT":
        data = json.loads(request.body)
        todo.title = data.get("title")
        todo.save()
        return JsonResponse({"id": todo.id, "title": todo.title})

    if request.method == "DELETE":
        todo.delete()
        return JsonResponse({"message": "deleted"})